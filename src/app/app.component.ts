import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Intro, Session} from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  intro: Intro;
  session: Session;
  sessionIndex: number;
  sessionNames: string[];
  introComplete: boolean;
  startedSessions: boolean;
  sessionComplete: boolean;
  onLastSession: boolean;

  // Read in the Json file.
  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.sessionNames = ['session_1'];
    this.sessionIndex = -1;
    this.introComplete = false;
    this.startedSessions = false;
    this.sessionComplete = false;
    this.onLastSession = false;
    this.getIntro();
  }

  getIntro() {
    this.api.getIntro().subscribe(intro => {
      this.intro = intro;
      console.log('Loaded intro from JSON');
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
    this.sessionIndex++;
    this.introComplete = true;
    this.startedSessions = true;
    this.sessionComplete = false;
    if (this.sessionIndex < this.sessionNames.length) {
      console.log('Moving on to session ' + this.sessionIndex);
      this.sessionComplete = false;
      this.api.getSession(this.sessionNames[this.sessionIndex]).subscribe(session => {
        this.session = session;
        console.log('Loaded session from JSON');

      });
    }
  }
}
