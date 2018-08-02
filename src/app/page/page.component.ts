import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
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

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  // @ViewChild('child')
  // private div: DivComponent;

  constructor() { }

  ngOnInit() {
    this.divIndex = 0;
    // this.div.initDiv();
  }

  getDiv() {
    console.log(this.divIndex)
    var div = this.page.divs[this.divIndex];
    console.log(div);
    return div
  }

  divCompleted() {
    console.log(this.page.divs[this.divIndex])
    this.divIndex++;
    if (this.divIndex == this.page.divs.length) {
      this.divIndex = 0;
      this.allDone();
    }
  }

  allDone() {
    console.log("Completed page")
    this.done.emit();
  }

}
