import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { Step, Page } from '../interfaces';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit, OnChanges {

  @Input()
  step: Step;
  pageIndex: number;
  currentPage: Page;
  allowContinue = false;
  correct = true;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.pageIndex = 0;
    this.initPage();
  }

  ngOnChanges() {
    this.pageIndex = 0;
    this.initPage();
  }

  initPage() {
    this.currentPage = this.step.pages[this.pageIndex];
    this.allowContinue = false;
  }

  nextPageButtonVisible() {
    return (this.allowContinue && this.pageIndex < this.step.pages.length);
    // return true;
  }

  prevPageButtonVisible() {
    return (this.allowContinue && !(this.pageIndex <= 0));
  }

  pageCompleted(allCorrect= true) {
    if (!allCorrect) {
     this.correct = false;
    }
    if (this.pageIndex < this.step.pages.length) {
      this.allowContinue = true;
    } else {
      this.allDone();
    }
  }

  nextPage() {
    // console.log('Next page');
    this.pageIndex++;
    if (this.pageIndex < this.step.pages.length) {
      this.initPage();
    } else {
      this.allDone();
    }
  }

  prevPage() {
    // console.log('Previous page');
    this.pageIndex--;
    this.initPage();
  }

  allDone() {
    // console.log('Completed step');
    this.done.emit(this.correct);
  }
}
