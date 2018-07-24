import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Education, Scenario} from '../interfaces';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  @Input()
  education: Education;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  continueButtonVisible() {
    return true;
  }

  ngOnInit() {
  }

  allDone() {
    this.done.emit();
  }

}
