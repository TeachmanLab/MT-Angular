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

  ngOnInit() {
  }

  continueButtonVisible() {
    return true;
  }
  
  allDone() {
    this.done.emit();
  }

}
