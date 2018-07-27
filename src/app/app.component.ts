import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Intro, Session } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  intro: Intro;
  session: Session;
  session_index: number;
  session_names: string[];
  onIntro: boolean;

  // Read in the Json file.
  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.session_names = ['example_session'];
    this.session_index = -1;
    this.getIntro();
  }

  getIntro() {
    this.api.getIntro().subscribe(intro => {
      this.intro = intro;
      console.log('Loaded intro from JSON');
    });
    this.onIntro = true;
  }

  nextSession() {
    this.session_index++;
    this.onIntro = false;
    if (this.session_index < this.session_names.length) {
      console.log('Moving on to session ' + this.session_index);
      this.api.getSession(this.session_names[this.session_index]).subscribe(session => {
        this.session = session;
        console.log('Loaded session from JSON');
        console.log('Session contains ' + this.session.sections.length + ' sections.')
      });
    }
  }

  allDone() {
    this.nextSession();
  }
}
