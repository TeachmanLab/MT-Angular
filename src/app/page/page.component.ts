import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { Page } from '../interfaces';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnChanges {

  @Input()
  page: Page;
  pageIndex: number;
  numPages: number;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnChanges() {
    this.pageIndex = 0;
    this.numPages = this.page.elements.length;
    this.markStaticComponentsComplete();
  }

  markStaticComponentsComplete() {
    for (const element of this.page.elements) {
      // console.log(element.type);
      if (['Paragraph', 'References', 'Image', 'Header'].includes(element.type)) {
        // console.log(`completing a ${element.type}`);
        this.divCompleted();
      }
    }
  }

  divCompleted() {
    // console.log('Completed div ' + (this.pageIndex + 1) + ' of ' + this.numPages);
    this.pageIndex++;
    if (this.pageIndex === this.numPages) {
      this.done.emit();
    }
  }
}
