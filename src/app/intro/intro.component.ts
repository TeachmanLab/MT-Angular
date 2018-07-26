import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Intro } from '../interfaces';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  @Input()
  intro: Intro;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  allDone() {
    this.done.emit();
  }

}
