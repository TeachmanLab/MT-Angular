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
  stepIndex: number;
  stepComplete: boolean;
  currentStep: Step;
  numSteps: number;
  onLastStep: boolean;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.stepIndex = -1;
    this.numSteps = this.session.steps.length;
    this.onLastStep = false;
    this.stepComplete = false;
    this.nextstep();
  }

  nextstep() {
    this.stepIndex++;
    if (this.stepIndex < this.numSteps) {
      this.currentStep = this.session.steps[this.stepIndex];
    } else {
      this.onLastStep = true;
      this.allDone()
    }
  }

  nextStepButtonVisible() {
    return this.stepComplete && !this.onLastStep;
  }

  allDone() {
    this.done.emit();
  }

}
