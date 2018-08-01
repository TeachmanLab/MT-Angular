import { Component } from '@angular/core';
import { ApiService } from './api.service';
import {SessionComponent} from './session/session.component';
import { Intro, Session} from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  intro: Intro;
  sessions: Session[]
  session: Session;
  sessionIndex: number;
  introComplete: boolean;
  startedSessions: boolean;
  sessionComplete: boolean;
  onLastSession: boolean;

  // Read in the Json file.
  constructor(
    private api: ApiService,
    private sessionCom: SessionComponent
  ) { }

  ngOnInit() {
    this.introComplete = false;
    this.getIntro();

    this.sessions = [];
    this.sessionIndex = -1;
    this.startedSessions = false;
    this.sessionComplete = false;
    this.onLastSession = false;
    this.getSessions();
  }

  getIntro() {
    this.api.getIntro().subscribe(intro => {
      this.intro = intro;
      console.log('Loaded intro from JSON');
    });
  }

  getSessions() {
    this.api.getSessions().subscribe(sessions => {
      this.sessions = sessions;
      console.log(this.sessions);
      console.log('Loaded session from JSON');
    });
  }

  introVisible() {
    return !this.startedSessions;
  }

  sessionVisible() {
    return this.startedSessions;
  }

  nextSessionButtonVisible() {
    return (this.introComplete && !this.startedSessions) || (this.sessionComplete && !this.onLastSession);
  }

  nextSession() {
    debugger;
    this.sessionIndex++;
    console.log(this.sessionIndex)
    console.log(this.sessions.length)
    this.introComplete = true;
    this.startedSessions = true;
    this.sessionComplete = false;
    if (this.sessionIndex < this.sessions.length) {
      console.log('Moving on to session ' + this.sessionIndex);
      debugger;
      this.session = this.sessions[this.sessionIndex];
      this.sessionComplete = false;
    } else {
      this.sessionComplete = true;
    }
    console.log(this.session);
  }
}
