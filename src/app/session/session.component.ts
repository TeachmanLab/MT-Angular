import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Step, Session} from '../interfaces';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  @Input()
  sessions: Session[];
  numSessions: number;
  startedSessions: boolean;
  sessionIndex: number;
  currentSession: Session;
  sessionComplete: boolean;
  onLastSession: boolean;

  stepIndex: number;
  stepComplete: boolean;
  currentStep: Step;
  numSteps: number;
  onLastStep: boolean;
  
  state: string;
  states: string[];
  stateIndex: number;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.states = ['intro', 'steps'];
    this.stateIndex = 0;
    this.state = this.states[0];

    this.startedSessions = false;
    this.sessionIndex = 0;

    this.onLastSession = false;
    this.numSessions = this.sessions.length;

      console.log(this.sessions)
      console.log(this.sessions.length)

    this.initSession();
   
  }

  initSession() {
    this.currentSession = this.sessions[this.sessionIndex];
    this.numSteps = this.currentSession.steps.length;
    this.sessionComplete = false;
    this.stepIndex = 0;
    this.initStep();
  }

  initStep() {
    this.stepComplete = false;
    this.currentStep = this.currentSession.steps[this.stepIndex];
    console.log('Now on step ' + this.stepIndex + ' of ' + this.numSteps);
  }

  // Need to factor out progressState into a service, probably
  progressState() {
      this.stateIndex++;
      if (this.stateIndex < this.states.length) {
        this.state = this.states[this.stateIndex];
        console.log('The state index is ' + this.stateIndex + '.  The state is ' + this.state);
      }

  }

  stepsVisible() {
    return !(this.state === 'intro');
  }

  nextStepButtonVisible() {
    return this.state === 'intro' || (this.stepComplete && !this.onLastStep);
  }

  nextStep() {
    
    if (this.stepIndex == 0) {
      this.progressState();
    }

    this.stepIndex++;

    if (this.stepIndex <= this.numSteps - 1) {
      this.initStep();
      if (this.stepIndex == this.numSteps - 1) {
        this.onLastStep = true;
      }
    } else {
      this.allDone();
    }
  }

  nextSessionButtonVisible() {
    // return this.onLastStep && !this.onLastSession;
    return true;
  }

  nextSession() {

    this.sessionIndex++;

    if (this.sessionIndex <= this.numSessions) {
      this.initSession();

      if (this.sessionIndex == this.sessions.length - 1) {
        this.onLastSession = true;
      }

    } else {
      this.sessionComplete = true;
    }
  }

  allDone() {
    console.log()
    this.done.emit();
  }

}
