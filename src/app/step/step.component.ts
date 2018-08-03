import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Step, Page} from '../interfaces';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

  @Input()
  step: Step;
  numPages: number;
  pageIndex: number;
  currentPage: Page;
  onLastPage: boolean;
  pageComplete: boolean;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.init()
  }

  ngOnChanges(changes:SimpleChanges) {
    console.log('New step');
    this.step = changes.step.currentValue;
    this.init();
  }

  init() {
    this.numPages = this.step.pages.length;
    this.pageIndex = 0;
    this.currentPage = this.step.pages[0];
    this.onLastPage = false;
    this.pageComplete = false;
  }

  nextPageButtonVisible() {
    return this.pageComplete && !this.onLastPage;
  }

  pageCompleted() {
    ("Hello I actually completed this page!")
    this.pageComplete = true;
    if (this.onLastPage) {
      this.allDone();
    }
  }

  nextPage() {
    console.log("beginning new page");
    this.pageIndex++;
    if (this.pageIndex < this.numPages) {
      this.currentPage = this.step.pages[this.pageIndex];
      this.pageComplete = false;
      
      if (this.pageIndex == this.numPages - 1) {
        this.onLastPage = true;
      }
    } else {
      this.allDone()
    }
  }

  allDone() {
    console.log("Completed step")
    this.done.emit();
  }
}
