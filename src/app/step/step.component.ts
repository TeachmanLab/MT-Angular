import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Step, Page, Session, PageData } from '../interfaces';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit, OnChanges {

  @Input() step: Step;
  @Input() session: Session;
  @Input() step_index: number;
  pageIndex: number;
  pageData: PageData[] = [];
  currentPage: Page;
  allowContinue = false;
  startFromEnd = false;
  stepCorrect = true;
  elementCorrect = true;
  date: string;
  startTime: number;
  endTime: number;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  @Output()
  review: EventEmitter<any> = new EventEmitter();


  constructor (
    private api: ApiService
  ) { }

  ngOnInit() {
    this.pageIndex = 0;
  }

  ngOnChanges() {
    if (this.startFromEnd) {
      this.pageIndex = this.step.pages.length - 1;
      this.startFromEnd = false;
    } else {
      this.pageIndex = 0;
    }
    this.initPage();
  }

  initPage() {
    this.pageData = [];
    this.date = new Date().toString();
    this.startTime = performance.now();
    this.currentPage = this.step.pages[this.pageIndex];
    this.allowContinue = false;
    window.scrollTo(0, 0);
  }

  nextPageButtonVisible() {
    return (this.allowContinue && this.pageIndex < this.step.pages.length);
  }

  prevPageButtonVisible() {
    // This should disable the 'previous' button on the first page of the session only.
      return (!(this.step_index <= 0 && this.pageIndex <= 0));
  }

  pageCompleted(allCorrect= true) {
    if (!allCorrect) {
     this.stepCorrect = false;
     this.elementCorrect = false;
    }
    if (this.pageIndex < this.step.pages.length) {
      this.allowContinue = true;
    } else {
      this.allDone();
    }
  }

  recordPageData() {
    this.endTime = performance.now();
    for (const el of this.currentPage.elements) {
      const elData = {date: this.date, session: this.session.title + ': ' + this.session.subTitle,
        device: navigator.userAgent, rt: this.endTime - this.startTime, rt_first_react: 0, step_title: this.step.title,
        step_index: this.step_index, stimulus: el.content, trial_type: el.type, buttonPressed: el.buttonPressed,
        correct: this.elementCorrect, time_elapsed: this.endTime - this.session.startTime, conditioning: this.session.conditioning,
        study: this.session.study
      };

      if (el.responseTime) {
        elData['rt_first_react'] = el.responseTime - this.startTime;
      } else {
        elData['rt_first_react'] = this.endTime - this.startTime;
      }

      this.pageData.push(elData);
    }
    console.log('pageData', this.pageData);
    // this.api.addResponse(this.pageData);
  }

  nextPage() {
    // console.log('Next page');
    this.recordPageData();
    this.elementCorrect = true;
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
    if (this.pageIndex < 0) {
      this.startFromEnd = true;
      this.review.emit();
    } else {
      this.initPage();
    }
  }

  allDone() {
    // console.log('Completed step');
    this.done.emit(this.stepCorrect);
    this.stepCorrect = true;
  }
}
