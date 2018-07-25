import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Education, EducationSession, Section, Session} from '../interfaces';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  @Input()
  session: Session;
  section_index: number;
  current_section: Section;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.section_index = -1;
    this.nextSession();
  }

  nextSession() {
    this.section_index++;
    if (this.section_index < this.session.sections.length - 1) {
      this.current_section = this.session.sections[this.section_index];
    }
  }

  allDone() {
    this.nextSession();
  }

}
