import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Countdown, ElementEvent, MissingLetter} from '../interfaces';
import {interval} from 'rxjs';

enum CountDownState {
  'NOT_STARTED', 'WAIT', 'READY'
}

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit, AfterViewInit {

  @Input()
  countdown: Countdown;

  state = CountDownState.NOT_STARTED;
  states = CountDownState;
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
  }

  ngAfterViewInit(): void {
    if (this.countdown.autoStart) {
      this.startCountdown();
    }
  }

  startCountdown() {
    this.state = CountDownState.WAIT;
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
    this.playAudio();
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

  playAudio() {
    const audio = new Audio();
    audio.src = 'assets/sounds/bing.wav';
    audio.load();
    audio.play();
  }
}
