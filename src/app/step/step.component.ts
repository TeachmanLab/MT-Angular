import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Step, Page } from '../interfaces';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  @Input()
  step: Step;
  numPages: number;
  pageIndex: number;
  currentPage: Page;
  onLastPage: boolean;
  pageComplete: boolean;
  prevPagesCompleted: boolean;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.initStep()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.step.isFirstChange()) {
      console.log('New step');
      this.step = changes.step.currentValue;
      this.initStep();
    }
  }

  initStep() {
    this.prevPagesCompleted = false;
    this.numPages = this.step.pages.length;
    this.pageIndex = 0;
    this.initPage();

  }

  initPage() {
    this.currentPage = this.step.pages[this.pageIndex];
    if (this.pageIndex === this.numPages - 1) {
      this.onLastPage = true;
    } else {
      this.onLastPage = false;
    }
    this.pageComplete = false;
  }

  nextPageButtonVisible() {
    console.log("prev pages completed? " +this.prevPagesCompleted);
    console.log("page complete? " + this.pageComplete);
    console.log("on last page " + this.onLastPage);
    return ((this.prevPagesCompleted || this.pageComplete) && !this.onLastPage);
  }

  prevPageButtonVisible() {
    return !(this.pageIndex <= 0);
  }

  pageCompleted() {
    console.log('Completed page')
    this.pageComplete = true;
    if (this.onLastPage) {
      this.allDone();
    }
  }

  nextPage() {
    console.log("Next page");
    this.pageIndex++;
    if (this.pageIndex < this.numPages) {
      this.initPage();
    } else {
      this.allDone()
    }
  }

  prevPage() {
    console.log("Previous page");
    this.pageIndex--;
    this.initPage();

  }

  allDone() {
    console.log("Completed step")
    this.done.emit();
  }
}
