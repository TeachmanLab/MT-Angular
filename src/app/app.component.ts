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
  introComplete: boolean;

  sessions: Session[];
  startedSessions: boolean;

  // Read in the Json file.
  constructor(
    private api: ApiService,
    private sessionComponent: SessionComponent
  ) { }

  ngOnInit() {
    this.getIntro();
  }

  getIntro() {
    this.startedSessions = false;
    this.introComplete = false;
    this.api.getIntro().subscribe(intro => {
      this.intro = intro;
      console.log('Loaded intro from JSON');
    });
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
