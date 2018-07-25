import {Component, Input, OnInit} from '@angular/core';
import {EducationSession, EducationSessionIndicator} from '../interfaces';

// @ts-ignore
@Component({
  selector: 'app-education-session-indicator',
  templateUrl: './education-session-indicator.component.html',
  styleUrls: ['./education-session-indicator.component.css']
})
export class EducationSessionIndicatorComponent implements OnInit {

  constructor() { }

  @Input()
  educationSession: EducationSession;

  ngOnInit() {
  }

}
