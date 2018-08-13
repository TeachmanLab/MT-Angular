import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Session} from '../interfaces';

@Component({
  selector: 'app-control-condition',
  templateUrl: './control-condition.component.html',
  styleUrls: ['./control-condition.component.css']
})
export class ControlConditionComponent implements OnInit {

  title = 'Control Condition';

  sessions: Session[];
  startedSessions: boolean;
  sessionIndex = 0;
  currentSession: Session;
  allDone = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getSessions();
  }

  getSessions() {
    this.startedSessions = true;
    this.api.getSessions().subscribe(sessions => {
      this.sessions = sessions;
      this.currentSession = this.sessions[this.sessionIndex];
      console.log(`Sessions:${JSON.stringify(this.sessions)}`);
      console.log(`Loaded ${this.sessions.length} sessions.`);
      console.log('The current session is ' + this.currentSession);
    });
  }

  sessionComplete() {
    console.log('The session is complete.  Loading the next Session.');
    this.sessionIndex++;
    if (this.sessionIndex < this.sessions.length) {
      this.currentSession = this.sessions[this.sessionIndex];
    } else {
      this.currentSession = null;
      this.allDone = true;
    }
  }
}
