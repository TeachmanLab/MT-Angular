import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  section_index: number;
  current_section: Section;
  num_sections: number;
  on_last_section: boolean;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor(
    private sessionButtonService: SessionButtonService
  ) { }

  ngOnInit() {
    this.section_index = -1;
    this.num_sections = this.session.sections.length;
    this.on_last_section = false;
    this.nextSection();
  }

  nextSection() {
    this.section_index++;
    if (this.section_index < this.num_sections) {
      this.current_section = this.session.sections[this.section_index];
    } else {
      this.on_last_section = true;
    }
  }

  nextSessionButtonVisible() {
    return this.on_last_section;
  }

  allDone() {
    this.nextSection();
  }

}
