import { Component, OnInit } from '@angular/core';
import {SessionComponent} from '../session/session.component';
import {ApiService} from '../api.service';
import {Session} from '../interfaces';

@Component({
  selector: 'app-control-condition',
  templateUrl: './control-condition.component.html',
  styleUrls: ['./control-condition.component.css']
})
export class ControlConditionComponent implements OnInit {

  title = 'Control Condition';
  introComplete: boolean;

  sessions: Session[];
  startedSessions: boolean;

  constructor(
    private api: ApiService,
    private sessionComponent: SessionComponent
  ) {
  }

  ngOnInit() {
    this.getSessions();
  }

  getSessions() {
    console.log('INTRO COMPLETE: ' + this.introComplete);
    this.startedSessions = true;
    this.api.getSessions().subscribe(sessions => {
      this.sessions = sessions;
      console.log('Loaded sessions from JSON');
    });
  }

  introVisible() {
    return !this.startedSessions;
  }

  sessionsVisible() {
    return this.startedSessions;
  }

  beginButtonVisible() {
    // return this.introComplete;
    return true;
  }
}
