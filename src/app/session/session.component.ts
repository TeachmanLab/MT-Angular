import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Section, Session} from '../interfaces';
import { SessionButtonService } from '../session-button.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  @Input()
  session: Session;
  sectionIndex: number;
  currentSection: Section;
  numSections: number;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.sectionIndex = -1;
    this.numSections = this.session.sections.length;
    this.nextSection();
  }

  nextSection() {
    this.sectionIndex++;
    if (this.sectionIndex < this.numSections) {
      this.currentSection = this.session.sections[this.sectionIndex];
    } else {
      this.allDone();
    }
  }

  allDone() {
    this.done.emit()
  }

}
