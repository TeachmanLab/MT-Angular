import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Session } from '../interfaces';

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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.setCurrentSession();
  }

  setCurrentSession () {
    this.api.getControlSessions().subscribe(sessions => {
      this.sessions = sessions;
      // this.api.getProgress().subscribe(progress => {
      //   if (progress['sessionIndex']) {
      //     this.sessionIndex = progress['sessionIndex'];
      //   }
      //   this.currentSession = this.sessions[this.sessionIndex];
      // });
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
    window.scrollTo(0, 0);
    if (this.sessionIndex < this.sessions.length - 1) {
      this.sessionDone = true;
    } else {
      this.currentSession = null;
      this.allDone = true;
    }
  }

  introSession () {
    return this.sessionIndex === 0;
  }

  goSession1 () {
    this.router.navigate(['control', 1]);
  }
}
