import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../interfaces';
import {interval} from 'rxjs';
import { LastService } from '../last.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question;
  state: string;
  waitPercent: number;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor(
    private lastService: LastService
  ) { }

  ngOnInit() {
    this.state = 'asking';
    this.waitPercent = 0;
  }

  selected(option: string) {
      if (this.question.type === 'single') { 
        if (option === this.question.answer) {
          this.state = 'correct';
          this.waitAndEmit();
        } else {
          this.state = 'incorrect';
          this.makeThemWait();
        }
      }
      else {
        this.state = 'answered'
        this.waitAndEmit();
      }
  }

  waitAndEmit() {
    const secondsCounter = interval(1000);
    const subscription = secondsCounter.subscribe( n => {
      // next line lets choices show up again, for questions in multiple succession
      this.state = 'asking';
      this.allDone();
      subscription.unsubscribe();
    });
  }

  makeThemWait() {
    const secondsCounter = interval(1000);
    this.waitPercent = 0;
    let counter = 0;
    const subscription = secondsCounter.subscribe( n => {
      counter ++;
      this.waitPercent += 10;
      if (counter > 10) {
        this.state = 'asking';
        subscription.unsubscribe();
      }
    });
  }

  isLastQuestion() {
    return this.question === this.lastService.getLastQuestion();
  }

  allDone() {
    console.log('completed question');
    this.done.emit();
  }
}
