import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {Page, EventRecord, Scenario, Session, Study, ElementEvent} from '../interfaces';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss'],
  animations: [
    trigger('flyUpDown', [
      state('in', style({transform: 'translateY(0)'})),
      transition('void => *', [
        animate(600, keyframes([
          style({opacity: 0, transform: 'translateY(100%)', offset: 0}),
          style({opacity: 1, transform: 'translateY(15px)', offset: 0.3}),
          style({opacity: 1, transform: 'translateY(0)', offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateY(0)', offset: 0}),
          style({opacity: 1, transform: 'translateY(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateY(-100%)', offset: 1.0})
        ]))
      ])
    ]),
    trigger('titleState', [
      state('Intro', style({
        transform: 'translateY(200%) translateX(100%) scale(4)'
      })),
      state('*', style({
        color: '#000',
        transform: 'scale(1)',
        opacity: 0
      })),
      transition('Intro => *', animate('600ms ease-in')),
      transition('* => Intro', animate('600ms ease-out'))
    ]),
    trigger('imageState', [
      state('Intro', style({
        opacity: 1
      })),
      state('*', style({
        opacity: 0
      })),
      transition('* => Intro', animate('600ms ease-in')),
      transition('Intro => *', animate('600ms ease-out'))
    ]),
  ]
})
export class ScenarioComponent implements OnInit, OnChanges {

  @Input()
  scenario: Scenario;
  @Input()
  isStory = false;
  @Input()
  scenarioIndex: number;
  @Input()
  session: Session;
  @Input()
  sessionIndex: number;
  @Input()
  stepIndex: number;
  @Input()
  pageCount: number;

  study: Study;
  pageIndex = 0;
  currentPage: Page;
  state: string;
  pageData: EventRecord[] = [];
  startTime: number;
  endTime: number;
  firstReactionTime: number;
  pageCounter: number;
  connectionError = false;

  @Output()
  done: EventEmitter<boolean> = new EventEmitter();

  @Output()
  finalCount: EventEmitter<number> = new EventEmitter();

  constructor(
    private api: ApiService
  ) {
  }

  ngOnInit() {
    // setting up the page counter in order to transition seamlessly between the session steps and round scenarios
    // the count must begin after the page count that gets established in the step component

    if (this.pageCount) {
      this.pageCounter = this.pageCount + 1;
    } else {
      this.pageCounter = 1;
    }
    this.study = {name: '', currentSession: {index: 0, name: '',
        currentTask: {name: 'unknown', displayName: 'unknown', type: 'unknown'}}, conditioning: ''};
    this.api.getStudy().subscribe(study => {
      this.study = study;
    });
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currentPage = this.scenario.pages[0];
    this.state = this.currentPage.elements[0].type;
    if (changes.scenario && !changes.scenario.isFirstChange()) {
      this.scenario = changes.scenario.currentValue;
      this.init();
    }
  }

  init() {
    this.pageIndex = 0;
    this.scenario.numCorrect = 0;
    this.scenario.numAnswer = 0;
    this.scenario.score = 0;
    this.currentPage = this.scenario.pages[0];
    this.state = this.currentPage.elements[0].type;
    this.pageData = [];
    this.startTime = performance.now();
    window.scrollTo(0, 0);
  }

  continueButtonVisible() {
    return this.state === 'Intro';
  }

  handleEvent(event: ElementEvent) {
    this.endTime = performance.now();
    this.recordStateData(event);
  }

  recordStateData(event: ElementEvent) {
    const data = {
      session: this.session.session,
      sessionIndex: this.sessionIndex,
      sessionTitle: this.session.title + ': ' + this.session.subTitle,
      conditioning: this.study.conditioning,
      study: this.study.name,
      task: this.study.currentSession.currentTask.name,
      stepTitle: 'scenario',
      stepIndex: this.stepIndex,
      stimulusName: this.scenario.title,
      device: navigator.userAgent,
      timeElapsed: this.endTime - this.session.startTime,
      sessionCounter: this.sessionIndex + '.' + this.stepIndex + '.' + this.pageIndex
    };

    const record: EventRecord = {...event, ...data};
    this.pageData.push(record);
    this.api.saveProgress(this.pageData).subscribe(d => {
        this.pageCounter++;
      },
      error1 => {
        this.connectionError = true;
      });
  }

  progressState(correctAnswer = true, scored = true) {
    if (scored) { this.scenario.numAnswer++; }
    if (scored && correctAnswer) { this.scenario.numCorrect++; }
    if (!this.firstReactionTime) { this.firstReactionTime = performance.now(); }
    this.pageData = [];
    this.pageIndex++;
    this.pageCounter++;
    if (this.pageIndex < this.scenario.pages.length) {
      this.currentPage = this.scenario.pages[this.pageIndex];
      this.state = this.currentPage.elements[0].type;
    } else {
      this.done.emit(this.scenario.numAnswer === this.scenario.numCorrect);
      this.finalCount.emit(this.pageCounter);
    }
    window.scrollTo(0, 0);
  }

  continue() {
    let data: ElementEvent;
    this.endTime = performance.now();
    for (const el of this.currentPage.elements) {
      data = {
        trialType: el.type,
        stimulus: el.content.toString(),
        buttonPressed: 'continue',
        correct: true,
        rtFirstReact: this.endTime - this.startTime,
        rt: this.endTime - this.startTime
      };
      this.recordStateData(data);
    }
    this.progressState(true, false);
  }
}
