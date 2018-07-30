import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Education, EducationSession, Intro, Section} from '../interfaces';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: [
    './education.component.scss',
  ]
})
export class EducationComponent implements OnInit {

  @Input()
  education: Education;
  current_edu_session: EducationSession;
  edu_session_index: number;
  num_edu_session: number;
  on_last_edu_session: boolean;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.education);
    console.log('what is education?');
    this.edu_session_index = -1;
    this.num_edu_session = this.education.eduSession.length;
    this.on_last_edu_session = false;
    this.nextEduSession();
  }


  nextEduSession() {
    this.edu_session_index++;
    if (this.edu_session_index < this.num_edu_session) {
      this.current_edu_session = this.education.eduSession[this.edu_session_index];
    } else {
      this.on_last_edu_session = true;
    }
  }

  continueButtonVisible() {
    return true;
  }
  
  allDone() {
    this.nextEduSession();
  }

}
