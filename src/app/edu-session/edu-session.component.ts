import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EducationSession, Step} from '../interfaces';

@Component({
  selector: 'app-edu-session',
  templateUrl: './edu-session.component.html',
  styleUrls: ['./edu-session.component.css']
})
export class EduSessionComponent implements OnInit {

  @Input()
  current_edu_session: EducationSession;
  current_steps: Step[];
  onStep: boolean;

  constructor() { }

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    debugger;
    console.log(this.current_edu_session);
    console.log(this.current_steps);
    this.onStep = false;
  }

  nextStep() {
    this.current_steps = this.current_edu_session.steps;
  }

  continueButtonVisible() {
    return true;
  }

  allDone() {
    this.onStep = true;
    this.current_steps = this.current_edu_session.steps;
  }

}
