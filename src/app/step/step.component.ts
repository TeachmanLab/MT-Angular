import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {Step, Page, Session, EventRecord, Study, ElementEvent} from '../interfaces';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit, OnChanges {

  @Input() step: Step;
  @Input() session: Session;
  @Input() stepIndex: number;
  @Input() sessionIndex: number;
  @Input() previousEnabled = false;
  @Input() useApi = true;

  study: Study;
  pageIndex: number;
  pageData: EventRecord[] = [];
  currentPage: Page;
  allowContinue = false;
  startFromEnd = false;
  stepCorrect = true;
  elementCorrect = true;
  startTime: number;
  endTime: number;
  pageCounter: number;
  elementCounter: number;
  updateEvents = new Map<string, ElementEvent>();

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
    this.study = {name: '', currentSession: {index: 0, name: '',
        currentTask: {name: 'unknown', displayName: 'unknown', type: 'unknown'}}, conditioning: ''};
    if (this.useApi) {
      this.api.getStudy().subscribe(study => {
        this.study = study;
      });
    }
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
    if (!this.previousEnabled) {
      return false;
    }

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
      if (this.currentPage.auto_continue) {
        this.nextPage();
      } else {
        this.allowContinue = true;
      }
    } else {
      this.allDone();
    }
  }

  recordElementEvent(event: ElementEvent) {
    const data = {
      session: this.session.session,
      sessionIndex: this.sessionIndex,
      sessionTitle: this.session.title + ': ' + this.session.subTitle,
      conditioning: this.study.conditioning,
      study: this.study.name,
      stepTitle: this.step.title,
      stepIndex: this.stepIndex,
      device: navigator.userAgent,
      timeElapsed: this.endTime - this.session.startTime,
      sessionCounter: this.sessionIndex +  '.' + this.stepIndex + '.' + this.pageIndex
    };
    const record: EventRecord = {...event, ...data};
    this.pageData.push(record);
  }

  // Some elements will emit events that might be replaced later.
  // they will emit updates, and only the last update should be recorded.
  elementUpdated(event: ElementEvent) {
    this.updateEvents.set(event.stimulusName, event);
  }

  recordPageData() {
    this.endTime = performance.now();

    // As we complete the page, record all update events.
    this.updateEvents.forEach((event: ElementEvent, key: string) => {
      this.recordElementEvent(event);
    });
    this.updateEvents.clear();

    const elData = {session: this.session.session, sessionIndex: this.sessionIndex,
      sessionTitle: this.session.title + ': ' + this.session.subTitle, device: navigator.userAgent, rt: this.endTime - this.startTime,
      rtFirstReact: 0, stepTitle: this.step.title, stepIndex: this.stepIndex, stimulus: '', trialType: 'page', buttonPressed: '',
      correct: this.elementCorrect, timeElapsed: this.endTime - this.session.startTime, conditioning: this.study.conditioning,
      study: this.study.name, sessionCounter: this.sessionIndex +  '.' + this.stepIndex + '.' + this.pageIndex,
      stimulusName: this.step.pages[this.pageIndex].elements[0].stimulusName,
    };
    elData['rtFirstReact'] = this.endTime - this.startTime;
    elData['buttonPressed'] = 'next';
    this.elementCounter++;
    this.pageData.push(elData);

    if (this.useApi) {
      this.api.saveProgress(this.pageData).subscribe(data => {
        this.pageCounter++;
      });
    } else {
      this.pageCounter++;
    }
  }

  nextPage() {
    console.log('Next page');
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
