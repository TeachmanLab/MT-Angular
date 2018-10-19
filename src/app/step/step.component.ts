import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Step, Page, Session, PageData } from '../interfaces';
import { ApiService } from '../api.service';
import {e} from '../../../node_modules/@angular/core/src/render3';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit, OnChanges {

  @Input() step: Step;
  @Input() session: Session;
  @Input() stepIndex: number;
  pageIndex: number;
  pageData: PageData[] = [];
  currentPage: Page;
  allowContinue = false;
  startFromEnd = false;
  stepCorrect = true;
  elementCorrect = true;
  startTime: number;
  endTime: number;
  pageCounter: number;
  elementCounter: number;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  @Output()
  review: EventEmitter<any> = new EventEmitter();

  @Output()
  finalPageCount: EventEmitter<number> = new EventEmitter();


  constructor (
    private api: ApiService
  ) { }

  ngOnInit() {
    this.pageIndex = 0;
    this.pageCounter = 1;
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
    this.startTime = performance.now();
    this.currentPage = this.step.pages[this.pageIndex];
    this.allowContinue = false;
    this.elementCounter = 1;
    window.scrollTo(0, 0);
  }

  nextPageButtonVisible() {
    return (this.allowContinue && this.pageIndex < this.step.pages.length);
  }

  prevPageButtonVisible() {
    // This should disable the 'previous' button on the first page of the session only.
      return (!(this.stepIndex <= 0 && this.pageIndex <= 0) && this.allowPrevious());
  }

  allowPrevious() {
    // it is important to step the user through questions with no answer so that we don't get multiple responses per question.
    // in order to do this we should look at the elements on the current and previous page and disable the previous button when appropriate.
    // if there is a question on a previous page and no answer is set on that question, this will return false, otherwise true.
    let elements = this.currentPage.elements;

    const previousPage = this.step.pages[this.pageIndex - 1];
    if (previousPage) {
      elements = elements.concat(previousPage.elements);
    }
    for (const element of elements) {
      if (element.type === 'Question') {
        return element.answer;
      }
    }
    return true;
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
      const elData = {session: this.session.session, sessionTitle: this.session.title + ': ' + this.session.subTitle,
        device: navigator.userAgent, rt: this.endTime - this.startTime, rtFirstReact: 0, stepTitle: this.step.title,
        stepIndex: this.stepIndex, stimulus: '', trialType: el.type, buttonPressed: '',
        correct: this.elementCorrect, timeElapsed: this.endTime - this.session.startTime, conditioning: this.session.conditioning,
        study: this.session.study, sessionCounter: this.pageCounter +  '.' + this.elementCounter
      };

      if (el.responseTime) {
        elData['rtFirstReact'] = el.responseTime - this.startTime;
      } else {
        elData['rtFirstReact'] = this.endTime - this.startTime;
      }

      if (el.buttonPressed) {
        elData['buttonPressed'] = el.buttonPressed;
      }

      if (el.content instanceof Array) {
        elData['stimulus'] = el.content.join(', ');
      } else {
        elData['stimulus'] = el.content;
      }

      this.elementCounter++;
      this.pageData.push(elData);
    }
    console.log('pageData', this.pageData);
    this.api.saveProgress(this.pageData).subscribe(data => {
      console.log('Saving the data to the server');
      this.pageCounter++;
    });
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
    this.finalPageCount.emit(this.pageCounter);
    this.done.emit(this.stepCorrect);
    this.stepCorrect = true;
  }
}
