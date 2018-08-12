import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Question } from '../interfaces';
import { interval } from 'rxjs';
import { LastService } from '../last.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question;
  states: string[];
  numStates: number;
  stateIndex: number;
  state: string;
  waitPercent: number;
  isCorrect: boolean;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor(
    private lastService: LastService
  ) { }

  ngOnInit() {
    this.states = ['asking', 'answered']
    this.numStates = this.states.length;
    this.waitPercent = 0;
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.question.isFirstChange()) {
      console.log('New question!');
      this.question = changes.question.currentValue;
      this.init();
    }
  }

  init() {
    this.stateIndex = 0;
    this.state = this.states[0];
    if (this.question.type === 'single') {
      this.isCorrect = false;
    }  
    console.log(this.isCorrect);
  }

  progressState() {
    this.stateIndex++;
    if (this.stateIndex < this.numStates) {
      this.state = this.states[this.stateIndex]
    }
  }

  selected(option: string) {
    if (this.question.type === 'single') {
      if (option === this.question.answer) {
        this.isCorrect = true;
        this.progressState();
        this.waitAndEmit();
      } else {
        this.isCorrect = false;
        this.progressState();
        this.makeThemWait();
      }
    } else {
      this.progressState();
      this.waitAndEmit();
    }
  }

  displayCorrectMessage() {
    return this.question.type === 'single' && this.state === 'answered' && this.isCorrect;
  }

  displayIncorrectMessage() {
    return this.question.type === 'single' && this.state === 'answered' && !this.isCorrect;
  }

  displayNextMessage() {
    return this.question.type === 'any' && this.state==='answered' && !this.isLastQuestion();
  }

  displayThankYouMessage() {
    return this.question.type === 'any' && this.state==='answered' && this.isLastQuestion();
  }

  waitAndEmit() {
    const secondsCounter = interval(1000);
    const subscription = secondsCounter.subscribe(n => {
      this.allDone();
      subscription.unsubscribe();
    });
  }

  makeThemWait() {
    const secondsCounter = interval(500);
    this.waitPercent = 0;
    let counter = 0;
    const subscription = secondsCounter.subscribe(n => {
      counter++;
      this.waitPercent += 10;
      if (counter > 10) {
        this.init();
        subscription.unsubscribe();
      }
    });
  }

  isLastQuestion() {
    return this.question === this.lastService.getLastQuestion();
  }

  allDone() {
    console.log('Completed question');
    this.done.emit();
  }
}
