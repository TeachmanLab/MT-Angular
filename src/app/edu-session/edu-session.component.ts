import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Education, EducationSession, Section} from '../interfaces';

@Component({
  selector: 'app-edu-session',
  templateUrl: './edu-session.component.html',
  styleUrls: ['./edu-session.component.css']
})
export class EduSessionComponent implements OnInit {

  @Input()
  educationSession: EducationSession;


  constructor() { }

  ngOnInit() {
    console.log(this.educationSession);
  }

}
