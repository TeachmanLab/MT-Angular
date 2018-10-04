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
  pageIndex: number;
  pageData: PageData[] = [];
  currentPage: Page;
  allowContinue = false;
  correct = true;
  date: string;
  startTime: number;
  endTime: number;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor (
    private api: ApiService
  ) { }

  ngOnInit() {
    this.pageIndex = 0;
  }

  ngOnChanges() {
    this.pageIndex = 0;
    this.initPage();
  }

  initPage() {
    this.pageData = [];
    this.date = new Date().toLocaleDateString();
    this.startTime = performance.now();
    console.log('start time', this.startTime);
    this.currentPage = this.step.pages[this.pageIndex];
    this.allowContinue = false;
    window.scrollTo(0, 0);
  }

  nextPageButtonVisible() {
    return (this.allowContinue && this.pageIndex < this.step.pages.length);
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

  recordPageData() {
    this.endTime = performance.now();
    console.log('page elements: ', this.currentPage.elements);
    console.log('this.correct is:', this.correct);
    for (const el of this.currentPage.elements) {
      const elData = {date: this.date, session: this.session.title + ': ' + this.session.subTitle,
        device: navigator.userAgent, rt: this.endTime - this.startTime, rt_first_react: 0,
        stimulus: this.step.title + ': ' + el.type + ' - page index: ' + this.pageIndex.toString(),
        trial_type: el.type, buttonPressed: el.buttonPressed, correct: this.correct, time_elapsed: this.endTime - this.session.startTime};

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
