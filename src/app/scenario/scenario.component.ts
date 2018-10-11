import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Page, PageData, Scenario, Session } from '../interfaces';

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
          style({opacity: 1, transform: 'translateY(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateY(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateY(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateY(-100%)',  offset: 1.0})
        ]))
      ])
    ]),
    trigger('titleState', [
      state('Intro', style({
        transform: 'translateY(150%) translateX(150%) scale(4)'
      })),
      state('*',   style({
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
      state('*',   style({
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
  scenarioIndex: number;
  @Input()
  session: Session;

  pageIndex = 0;
  currentPage: Page;
  state: string;
  pageData: PageData[] = [];
  scenarioCorrect: boolean;
  pageCorrect: boolean;
  date: string;
  startTime: number;
  endTime: number;

  @Output()
  done: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currentPage = this.scenario.pages[0];
    this.state = this.currentPage.elements[0].type;
    if (!changes.scenario.isFirstChange()) {
      console.log('New scenario!');
      this.scenario = changes.scenario.currentValue;
      this.init();
    }
  }

  init() {
    this.pageIndex = 0;
    this.currentPage = this.scenario.pages[0];
    this.state = this.currentPage.elements[0].type;
    this.scenarioCorrect = true;
    this.pageCorrect = true;
    this.pageData = [];
    this.date = new Date().toString();
    this.startTime = performance.now();
  }

  continueButtonVisible() {
    return this.state === 'Intro';
  }

  showStatement() {
    return(this.state === 'Statements' || this.state === 'MissingLetter');
  }

  recordStateData() {
    this.endTime = performance.now();
    for (const el of this.currentPage.elements) {
      const Data = {
        date: this.date, session: this.session.session, sessionTitle: this.session.title + ': ' + this.session.subTitle,
        device: navigator.userAgent, rt: this.endTime - this.startTime, rt_first_react: 0, step_title: this.scenario.title,
        step_index: this.scenarioIndex, stimulus: el.content, trial_type: this.state, buttonPressed: el.buttonPressed,
        correct: this.pageCorrect, time_elapsed: this.endTime - this.session.startTime, conditioning: this.session.conditioning,
        study: this.session.study
      };

      if (el.responseTime) {
        Data['rt_first_react'] = el.responseTime - this.startTime;
      } else {
        Data['rt_first_react'] = this.endTime - this.startTime;
      }

      this.pageData.push(Data);
    }

    console.log('pageData', this.pageData);
    // this.api.addResponse(this.pageData);
  }

  progressState(correctAnswer = true) {
    if (!correctAnswer) {
      this.scenarioCorrect = false;
      this.pageCorrect = false;
    }
    this.recordStateData();
    this.pageData = [];
    this.pageCorrect = true;
    this.pageIndex++;
    if (this.pageIndex < this.scenario.pages.length) {
      this.currentPage = this.scenario.pages[this.pageIndex];
      this.state = this.currentPage.elements[0].type;
      console.log('The page index is ' + this.pageIndex + '.  The state is ' + this.state);
    } else {
      console.log('The scenario is complete.' + this.pageIndex + '.  The state is ' + this.state);
      this.done.emit(this.scenarioCorrect);
    }
  }
}
