import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { Page, Div } from '../interfaces';
import { DivComponent } from '../div/div.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  @Input()
  page: Page;
  divIndex: number;
  numDivs: number;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  // @ViewChild('child')
  // private div: DivComponent;

  constructor() { }

  ngOnInit() {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Hey, the page changed!');
    this.page = changes.page.currentValue;
    this.init();
  }

  init() {
    this.divIndex = 0;
    this.numDivs = this.page.divs.length;
  }

  divCompleted() {
    console.log('Div ' + this.divIndex + ' of ' + this.numDivs)
    if (this.divIndex < this.numDivs) {
      this.divIndex++;
    } else {
      this.allDone();
    }
  }

  allDone() {
    console.log("Completed page")
    this.done.emit();
  }

}
