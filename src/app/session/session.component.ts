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

    this.initSession();
  }
  
  initSession() {
    // debugger;
    this.currentSession = this.sessions[this.sessionIndex];
    this.sessionComplete = false;
    this.stepIndex = -1;
    this.numSteps = this.currentSession.steps.length;
    this.onLastStep = false;
  }

  initStep() {
    this.stepComplete = false;
    this.currentStep = this.currentSession.steps[this.stepIndex];
    console.log('Now on step ' + (this.stepIndex + 1) + ' of ' + this.numSteps);
  }

  descriptionVisible() {
    return !this.startedSession;
  }

  stepsVisible() {
    return this.startedSession;
  }

  nextStepButtonVisible() {
    var visible = false;
    if (!this.startedSession) {
      visible = true;
    } else {
      if (this.stepComplete && !this.onLastStep) {
        visible = true;
      }
    }

    return visible;
  }

  nextSessionButtonVisible() {
    return this.onLastStep && this.stepComplete && !this.onLastSession;
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
    this.done.emit();
  }

}
