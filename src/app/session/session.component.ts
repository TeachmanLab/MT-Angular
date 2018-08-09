import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Step, Session} from '../interfaces';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  @Input()
  sessions: Session[];
  numSessions: number;
  startedSession: boolean;
  sessionIndex: number;
  currentSession: Session;
  sessionComplete: boolean;
  onLastSession: boolean;

  stepIndex: number;
  stepComplete: boolean;
  currentStep: Step;
  numSteps: number;
  onLastStep: boolean;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.startedSession = false;
    this.sessionIndex = 0;
    this.onLastSession = false;
    this.numSessions = this.sessions.length;

    console.log(this.sessions)
    console.log(this.sessions.length)

    this.initSession();
  }

  initSession() {
    // debugger;
    this.currentSession = this.sessions[this.sessionIndex];
    console.log(this.currentSession.steps);
    this.numSteps = this.currentSession.steps.length;
    this.sessionComplete = false;
    this.stepIndex = -1;
    this.initStep();
  }

  initStep() {
    this.stepComplete = false;
    this.currentStep = this.currentSession.steps[this.stepIndex];
    console.log('Now on step ' + this.stepIndex + ' of ' + this.numSteps);
  }

  descriptionVisible() {
    return !this.startedSession;
  }

  stepsVisible() {
    return this.startedSession;
  }

  nextStepButtonVisible() {
    // return (!this.startedSession || this.stepComplete && !this.onLastStep);
    return true;
  }

  nextSessionButtonVisible() {
    return this.onLastStep && !this.onLastSession;
  }
  
  nextStep() {
    // debugger;
    this.stepIndex++;
    this.startedSession = true;
    if (this.stepIndex < this.numSteps) {
      this.initStep();
      if (this.stepIndex == this.numSteps - 1) {
        this.onLastStep = true;
      }
    } else {
      this.allDone();
    }
  }

  nextSession() {
    this.sessionIndex++;
    this.startedSession = false;
    if (this.sessionIndex < this.numSessions) {
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
