import { Component, OnInit } from '@angular/core';
import {Study} from '../interfaces';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  study: Study;
  connectionError = false;
  state = '';

  constructor (
    private api: ApiService,
  ) {
    this.api.getStudy().subscribe(study => {
      this.study = study;
      console.log(this.study);
      if (this.study.currentSession.currentTask.name === 'recognitionRatings') {
        this.state = 'recognition';
      } else if (study.conditioning === 'CONTROL') {
        this.state = 'control';
      } else {
        this.state = 'training';
      }
    },
        error1 => {
      console.log('Failed to get study, sending user to the error page.');
      this.connectionError = true;
    });
  }

  ngOnInit() {
  }

}
