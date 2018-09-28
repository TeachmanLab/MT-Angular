import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Session} from '../interfaces';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-control-condition',
  templateUrl: './control-condition.component.html',
  styleUrls: ['./control-condition.component.scss']
})
export class ControlConditionComponent implements OnInit {

  title = 'Control Condition';

  sessions: Session[];
  sessionIndex = 0;
  currentSession: Session;
  sessionDone = false;
  allDone = false;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setCurrentSession();
  }

  setCurrentSession () {
    this.api.getSessions().subscribe(sessions => {
      this.sessions = sessions;
      this.route.params.subscribe(params => {
        if (params && params.hasOwnProperty('session')) {
          this.sessionIndex = params['session'];
          if (this.sessions[this.sessionIndex]) {
            this.currentSession = this.sessions[this.sessionIndex];
          } else {
            this.currentSession = this.sessions[0];
          }
        } else {
          this.currentSession = this.sessions[this.sessionIndex];
        }
      });
    });
  }

  sessionComplete() {
    // console.log('The session is complete.  Loading the next Session.');
    this.sessionIndex++;
    if (this.sessionIndex < this.sessions.length) {
      this.currentSession = null;
      this.sessionDone = true;
    } else {
      this.currentSession = null;
      this.allDone = true;
    }
  }
}
