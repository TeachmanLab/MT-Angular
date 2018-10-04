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
  correct = true;

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
      if (['Paragraph', 'References', 'Image', 'Header', 'Caption'].includes(element.type)) {
        // console.log(`completing a ${element.type}`);
        this.divCompleted();
      }
    }
  }

  divCompleted(correct= true) {
    // console.log('Completed div ' + (this.pageIndex + 1) + ' of ' + this.numPages);
    if (!correct) {
      this.correct = false;
    }
    this.pageIndex++;
    if (this.pageIndex === this.numPages) {
      this.done.emit(correct);
    }
  }

  getResponseDetails(event) {
    for (const element of this.page.elements) {
      if (['Question', 'ThoughtBubble'].includes(element.type)) {
        if (typeof event === 'number') {
          element.responseTime = event;
        }
        if (typeof event === 'string') {
          element.buttonPressed = event;
        }
      }
    }
  }
}
