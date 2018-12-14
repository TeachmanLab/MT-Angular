import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import {ElementEvent, ThoughtBubble} from '../interfaces';

@Component({
  selector: 'app-thoughtbubble',
  templateUrl: './thoughtbubble.component.html',
  styleUrls: ['./thoughtbubble.component.scss'],
})
export class ThoughtbubbleComponent implements OnInit {

  @Input()
  thoughtBubble: ThoughtBubble;

  states: string[];
  numStates: number;
  currentState: string;
  stateIndex: number;
  startTime: number;
  endTime: number;
  firstResponseTime: number;


  @Output()
  done: EventEmitter<any> = new EventEmitter();

  @Output()
  event: EventEmitter<ElementEvent> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.states = ['thought', 'followup'];
    this.thoughtBubble.content = this.thoughtBubble.thought; // for populating pageData
    this.init();
  }

  init() {
    this.startTime = performance.now();
    this.numStates = this.states.length;
    this.stateIndex = 0;
    this.currentState = this.states[0];
    // console.log('The current state is ' + this.currentState);
  }

  continueButtonVisible() {
    return this.currentState === 'thought';
  }

  progressState() {
    if (this.stateIndex === 0) {
      this.firstResponseTime = performance.now();
    }
    this.stateIndex++;
    if (this.stateIndex < this.numStates) {
      this.currentState = this.states[this.stateIndex];
      console.log('The current state is ' + this.currentState);
      if (this.stateIndex === this.numStates - 1) {
        this.endTime = performance.now();
        this.allDone();
      }
    } else {
      this.allDone();
    }
  }

  allDone() {
    const event: ElementEvent = {
      trialType: this.thoughtBubble.type,
      stimulus: this.thoughtBubble.thought,
      stimulusName: this.thoughtBubble.title,
      buttonPressed: '',
      correct: true,
      rtFirstReact: this.firstResponseTime - this.startTime,
      rt: this.startTime - this.endTime
    };
    this.event.emit(event);
    this.done.emit();
  }
}
