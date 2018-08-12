import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { Page, Div } from '../interfaces';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @Input()
  page: Page;
  divIndex: number;
  numDivs: number;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {

    if (!changes.page.isFirstChange()) {
      console.log('New page');
      this.page = changes.page.currentValue;
      this.init();
    }
  }

  init() {
    this.divIndex = 0;
    this.numDivs = this.page.divs.length;

  }

  divCompleted() {
    console.log('Completed div ' + (this.divIndex + 1) + ' of ' + this.numDivs);
    this.divIndex++;
    if (this.divIndex == this.numDivs) {
      this.allDone();
    }
  }

  allDone() {
    console.log("Completed page");
    this.done.emit();
  }

}
