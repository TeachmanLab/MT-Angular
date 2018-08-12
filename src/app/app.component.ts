import {Component, OnInit} from '@angular/core';
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
  sessionType = '';

  setType(type) {
    this.sessionType = type;
  }

}


