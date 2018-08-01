import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Step, Page} from '../interfaces';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

  @Input()
  step: Step;
  page: Page;
  pageIndex: number;
  numPages: number;
  pageComplete: boolean;
  onLastPage: boolean;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.pageIndex = -1;
    this.numPages = this.step.pages.length
    this.pageComplete = false;
    this.onLastPage = false;
    this.nextPage();
  }

  nextPageButtonVisible() {
    return this.pageComplete && !this.onLastPage;
  }

  nextPage() {
    this.pageIndex++;
    if (this.pageIndex < this.numPages) {
      this.page = this.step.pages[this.pageIndex];
    } else {
      this.onLastPage = true;
      this.allDone()
    }
  }

  allDone() {
    this.done.emit();
  }
}
