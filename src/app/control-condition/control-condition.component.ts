import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Session } from '../interfaces';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-control-condition',
  templateUrl: './control-condition.component.html',
  styleUrls: ['./control-condition.component.scss']
})
export class ControlConditionComponent implements OnInit {

  title = 'Control Condition';

  sessions: Session[];
  flexible = false;
  flexible_thinking: Session[] = [];
  sessionIndex = 0;
  currentSession: Session;
  sessionDone = false;
  connectionError = false;

  @Input() setSessionIndex: number;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.setSessionIndex) {
      this.sessionIndex = this.setSessionIndex;
    }
    this.setCurrentSession();
    this.checkStudy();
  }

  loadFlexibleThinking() {
    this.api.getFlexibleThinking().subscribe(sessions => {
      this.flexible_thinking = sessions;
    });
  }

  setCurrentSession () {
    this.api.getControlSessions().subscribe(sessions => {
      this.sessions = sessions;
      this.loadFlexibleThinking();
      this.route.params.subscribe(params => {
        if (params && params.hasOwnProperty('session')) {
          this.sessionIndex = Number(params['session'] - 1);
          if (this.sessions[this.sessionIndex]) {
            this.currentSession = this.sessions[this.sessionIndex];
          } else {
            this.currentSession = this.sessions[0];
          }
        } else {
          this.currentSession = this.sessions[this.sessionIndex - 1];
        }
      });
    });
  }

  showFlexible() {
    // console.log('The session is complete.  Loading the next Session.');
    window.scrollTo(0, 0);
    this.flexible = true;

  }

  sessionComplete() {
    // console.log('The session is complete.  Loading the next Session.');
    window.scrollTo(0, 0);
    this.sessionDone = true;
  }

  checkStudy() {
    this.api.getStudy().subscribe(study => {
      if (study.conditioning !== 'CONTROL') {
        this.connectionError = true;
      } else {
        this.connectionError = !(study.currentSession['index'] === this.sessionIndex);
      }
    },
      error1 => {
        this.connectionError = true;
      });
  }

  close() {
    window.location.href = environment.redirect;
  }
}
