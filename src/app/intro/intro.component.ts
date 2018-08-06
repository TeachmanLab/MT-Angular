import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Intro, Div, Page} from '../interfaces';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: [
    './intro.component.scss',
  ],
})
export class IntroComponent implements OnInit {

  @Input()
  intro: Intro;
  page: Page;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.page = this.intro.page;
  }

  allDone() {
    console.log('Completed Intro')
    this.done.emit();
  }

}
