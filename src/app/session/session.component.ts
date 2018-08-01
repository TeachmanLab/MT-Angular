import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Step, Session} from '../interfaces';
import { SessionButtonService } from '../session-button.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  @Input()
  session: Session;
  state: string;
  states: string[];
  state_index: number;

  firsTime: boolean;
  stepIndex: number;
  stepComplete: boolean;
  currentStep: Step;
  numSteps: number;
  onLastStep: boolean;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    debugger;
    this.states = ['intro', 'steps'];
    this.state_index = -1;
    this.progressState();
    console.log("test for the session");
    console.log(this.session);
    this.stepIndex = -1;
    this.numSteps = this.session.steps.length;
    this.onLastStep = false;
    this.stepComplete = false;
    this.firsTime = false;
  }

  // Need to factor out progressState into a service, probably
  progressState() {
    debugger;
    if (!this.firsTime) {
      this.state_index++;
      if (this.state_index < this.states.length) {
        this.state = this.states[this.state_index];
        console.log('The state index is ' + this.state_index + '.  The state is ' + this.state);
      }
    }
  }

  nextStep() {
    this.stepIndex++;

    // Indicate that we are now in the step phase
    // This will hide the intro
    // Not the best for performance purposes but it's the best I can do
    if (this.stepIndex == 0) {
      this.progressState();
    }

    if (this.stepIndex < this.numSteps) {
      this.currentStep = this.session.steps[this.stepIndex];
    } else {
      this.onLastStep = true;
      this.stepComplete = true;
      this.allDone();
    }
  }

  nextStepButtonVisible() {
    return this.state === 'intro' || (this.stepComplete && !this.onLastStep);
  }

  allDone() {
    this.done.emit();
  }

}
