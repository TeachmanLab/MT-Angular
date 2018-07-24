import { Component } from '@angular/core';
import {ApiService} from './api.service';
import {Session} from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  session: Session;

  // Read in the Json file.
  constructor(private api: ApiService) {
    this.api.getContent().subscribe(session => {
        this.session = session;
        console.log('Loaded session from Json');
        console.log('Session contains ' + this.session.sections.length + ' sections.')
    });
  }


}
