import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Page } from '../interfaces';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  @Input()
  page: Page;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  allDone() {
    console.log("done with page!");
    this.done.emit();
  }

}
