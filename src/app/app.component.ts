import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Session } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  current_session: Session;
  session_index: number;
  session_names: string[];
  private api: ApiService;

  // Read in the Json file.
  constructor(api: ApiService) {
    this.api = api;
  }

  ngOnInit() {
    this.session_names = ['intro', 'example_session'];
    this.session_index = -1;
    this.nextSession();
  }

  nextSession() {
    this.session_index++;
    if (this.session_index < this.session_names.length) {
      console.log('Moving on to session ' + this.session_index);
      this.api.getSession(this.session_names[this.session_index]).subscribe(session => {
        this.current_session = session;
        console.log('Loaded session from JSON');
        console.log('Session contains ' + this.current_session.sections.length + ' sections.')
      });
    }

  }

  allDone() {
    this.nextSession();
  }
}
