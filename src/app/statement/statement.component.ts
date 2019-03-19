import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {interval} from 'rxjs';
import {subscribeOn} from 'rxjs/operators';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss']
})
export class StatementComponent implements OnInit {

  @Input()
  statement: String;
  typed = '';
  letter_delay = 45; // wait this many milliseconds before displaying the next content.

  @Output()
  doneTyping: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    const secondsCounter = interval(this.letter_delay);
    const letters = this.statement.split('');
    let pauseCount = 0;
    let index = 0;
    const subscription = secondsCounter.subscribe( n => {
      if (pauseCount === 0) {
        if (index < letters.length) {
          if (letters[index] === '.') {
            pauseCount = 20;
          }
          this.typed = this.typed.concat(letters[index]);
        }
        index++;
        if (index === letters.length) {
          this.typed = this.typed.concat('...');
        }
      } else {
        pauseCount--;
      }
      if (index > letters.length) {
        this.doneTyping.emit(true);
        subscription.unsubscribe();
        return;
      }
    });
  }

}
