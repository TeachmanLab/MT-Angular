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

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  state = 'asking';
  waitPercent = 0;

  constructor() { }

  ngOnInit() {}

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
}
