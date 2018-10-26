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
  sessionIndex = 0;
  currentSession: Session;
  sessionDone = false;
  allDone = false;
  correctSession = false;

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

  setCurrentSession () {
    this.api.getControlSessions().subscribe(sessions => {
      this.sessions = sessions;
      this.route.params.subscribe(params => {
        if (params && params.hasOwnProperty('session')) {
          this.sessionIndex = Number(params['session']);
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
    window.scrollTo(0, 0);
    if (this.sessionIndex < this.sessions.length - 1) {
      this.sessionDone = true;
    } else {
      this.currentSession = null;
      this.allDone = true;
    }
  }

  checkStudy() {
    this.api.getStudy().subscribe(study => {
      if (study.conditioning !== 'NEUTRAL') {
        this.correctSession = false;
      } else {
        this.correctSession = study.currentSession['index'] === this.sessionIndex;
      }
    });
  }

  introSession () {
    return this.sessionIndex === 0;
  }

  goSession1 () {
    this.router.navigate(['control', 1]);
  }

  close() {
    console.log('Redirecting to ' + environment.redirect);
    window.location.href = environment.redirect;
  }
}
