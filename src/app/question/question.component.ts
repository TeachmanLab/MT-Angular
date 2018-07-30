import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../interfaces';
import {interval} from 'rxjs';

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

  constructor() { }

  ngOnInit() {
    this.state = 'asking';
    console.log(this.state);
    this.waitPercent = 0;
  }

  selected(option: string) {
      if (option === this.question.answer) {
        this.state = 'correct';
        this.waitAndEmit();
      } else {
        this.state = 'incorrect';
        this.makeThemWait();
      }
  }

  waitAndEmit() {
    const secondsCounter = interval(1000);
    const subscription = secondsCounter.subscribe( n => {
      this.state = 'asking';
      this.done.emit();
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

  allDone() {

    this.done.emit();
  }
}
