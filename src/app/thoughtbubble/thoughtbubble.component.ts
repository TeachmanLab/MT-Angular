import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ThoughtBubble } from '../interfaces';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-thoughtbubble',
  templateUrl: './thoughtbubble.component.html',
  styleUrls: ['./thoughtbubble.component.scss'],
  animations: [
    // from https://www.kdechant.com/blog/angular-animations-fade-in-and-fade-out
    // the fade-in/fade-out animation.
    trigger('fadeInBackground', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(200)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(200, style({opacity: 0})))
    ]),
    trigger('fadeInText', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({opacity: 1})),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({opacity: 0}),
        animate(600)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])
  ]
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
