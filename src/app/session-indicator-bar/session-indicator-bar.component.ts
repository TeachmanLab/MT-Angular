import { Component, Input, OnInit } from '@angular/core';
import { Session } from '../interfaces';

@Component({
  selector: 'app-session-indicator-bar',
  templateUrl: './session-indicator-bar.component.html',
  styleUrls: ['./session-indicator-bar.component.scss']
})
export class SessionIndicatorBarComponent implements OnInit {

  @Input() sessions: Session[];
  @Input() currentSession: Session;

  constructor() { }

  ngOnInit() {
  }

  displaySessions() {
    return this.sessions.filter(s => s.sessionIndicator);
  }


}
