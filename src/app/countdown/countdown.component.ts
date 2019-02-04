import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Countdown, ElementEvent, MissingLetter} from '../interfaces';
import {interval} from 'rxjs';

enum CountDownState {
  'WAIT', 'READY'
}

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

  @Input()
  countdown: Countdown;

  state = CountDownState.WAIT;
  startTime: number;
  endTime: number;
  currentSecond = 0;

  @Output()
  done: EventEmitter<boolean> = new EventEmitter();

  @Output()
  event: EventEmitter<ElementEvent> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.startTime = performance.now();

    const waitASectionTimer = interval( 1000);
    const sub = waitASectionTimer.subscribe( n => {
      this.currentSecond++;
      if (this.currentSecond >= this.countdown.delayInSeconds) {
        this.state = CountDownState.READY;
        this.timeIsUp();
        sub.unsubscribe();
      }
    });

  }

  timeIsUp() {
    this.endTime = performance.now();
    const event: ElementEvent = {
      trialType: this.countdown.type,
      stimulus: '',
      stimulusName: '',
      buttonPressed: '',
      correct: true,
      rtFirstReact: this.endTime - this.startTime,
      rt: this.endTime - this.startTime
    };
    this.event.emit(event);
    this.done.emit(true);
  }

}
