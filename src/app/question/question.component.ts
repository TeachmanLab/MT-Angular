import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Question } from '../interfaces';
import { interval } from 'rxjs';
import { LastService } from '../last.service';


enum QuestionStates {
  asking = 'asking',
  correct = 'correct',
  incorrect = 'incorrect'
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question;
  state: QuestionStates;
  waitPercent: number;
  incorrectAnswerSupplied = false;  // empit this value when complete.

  @Output()
  done: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private lastService: LastService
  ) { }

  ngOnInit() {
    this.state = QuestionStates.asking;
    this.waitPercent = 0;
  }

  selected(option: string) {
    if (this.question.answer) {
      if (option === this.question.answer) {
        this.state = QuestionStates.correct;
        this.waitAndEmit();
      } else {
        this.state = QuestionStates.incorrect;
        this.incorrectAnswerSupplied = true;
        this.makeThemWait();
      }
    } else {
      this.state = QuestionStates.correct;  // answer answer was acceptable.
      this.waitAndEmit();
    }
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
        this.ngOnInit();
        subscription.unsubscribe();
      }
    });
  }

  allDone() {
    console.log('Completed question');
    this.done.emit(!this.incorrectAnswerSupplied);
  }
}
