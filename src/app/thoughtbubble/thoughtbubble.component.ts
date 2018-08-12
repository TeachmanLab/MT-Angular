import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ThoughtBubble } from '../interfaces';

@Component({
  selector: 'app-thoughtbubble',
  templateUrl: './thoughtbubble.component.html',
  styleUrls: ['./thoughtbubble.component.scss']
})
export class ThoughtbubbleComponent implements OnInit {

  @Input()
  thoughtBubble: ThoughtBubble;

  states: string[];
  numStates: number;
  currentState: string;
  stateIndex: number;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.states = ['thought', 'followup'];
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.thoughtBubble.isFirstChange()) {
      this.thoughtBubble = changes.thoughtBubble.currentValue;
      this.init();
    }
  }

  init() {
    this.numStates = this.states.length;
    this.stateIndex = 0;
    this.currentState = this.states[0];
    console.log('The current state is ' + this.currentState);
  }

  continueButtonVisible() {
    return this.currentState === 'thought';
  }

  progressState() {
    this.stateIndex++;
    if (this.stateIndex < this.numStates) {
      this.currentState = this.states[this.stateIndex];
      console.log('The current state is ' + this.currentState);
      if (this.stateIndex === this.numStates - 1) {
        this.allDone();
      }
    } else {
      this.allDone();
    }
  }

  allDone() {
    this.done.emit();
  }
}
