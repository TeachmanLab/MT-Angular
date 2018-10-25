import { Component, OnInit } from '@angular/core';
import {Study} from '../interfaces';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  study: Study;

  constructor (
    private api: ApiService
  ) {
    this.api.getStudy().subscribe(study => {
      this.study = {name: study.name, currentSession: study.currentSession['name'], currentSessionIndex: study.currentSession['index'],
        conditioning: study.conditioning};
    });
  }

  ngOnInit() {
  }

}
