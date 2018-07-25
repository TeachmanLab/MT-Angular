import {Component, Input, OnInit} from '@angular/core';
import {Education, Intro} from '../interfaces';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})

export class IntroComponent implements OnInit {
  @Input()
  education: Education;
  intro: Intro;

  constructor() { }

  ngOnInit() {
  }

}
