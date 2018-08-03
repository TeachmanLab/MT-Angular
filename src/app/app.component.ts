import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Intro, Session } from './interfaces';
import { SessionComponent } from './session/session.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  intro: Intro;

  sessions: Session[];
  startedSessions: boolean;

  // Read in the Json file.
  constructor(
    private api: ApiService,
    private sessionComponent: SessionComponent
  ) { }

  ngOnInit() {
    this.startedSessions = false;
    this.getIntro();

    console.log(this.sessions);
    
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
      console.log(this.sessions)
      console.log(this.sessions.length)
      this.startedSessions = true;
      console.log('Loaded sessions from JSON');

    });
  }

  introVisible() {
    return !this.startedSessions;
  }

  sessionsVisible() {
    return this.startedSessions;
  }

  nextSessionButtonVisible() {
    // return this.onLastStep && !this.onLastSession;
    return true;
  }

}
