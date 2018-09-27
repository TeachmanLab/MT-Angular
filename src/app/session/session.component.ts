import { Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Step, Session } from '../interfaces';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit, OnChanges {

  sessions: Session[];

  @Input()
  session: Session;
  sessionIndex: number;
  stepIndex: number;
  currentStep: Step;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params && params.hasOwnProperty('session')) {
        this.sessionIndex = params['session'];
        this.loadSession(this.sessionIndex);
      } else {
        this.stepIndex = 0;
        this.initStep();
        this.api.getSessions().subscribe(sessions => {
          this.sessions = sessions;
        });
      }
    });
  }

  ngOnChanges() {
    // console.log('The Session was changed!');
    this.stepIndex = 0;
    this.initStep();
  }

  loadSession(sessionIndex: number) {
    this.api.getSessions().subscribe(sessions => {
      this.sessions = sessions;
      if (this.sessions[sessionIndex]) {
        this.session = this.sessions[sessionIndex];
      } else {
        this.session = this.sessions[0];
      }
      this.stepIndex = 0;
      this.initStep();
    });
  }

  initStep() {
    this.currentStep = this.session.steps[this.stepIndex];
    this.currentStep.status = 'active';
    // console.log('The current Step is ' + JSON.stringify(this.currentStep));
  }

  nextStep() {
    // console.log('Next Step called, loading the next step!');
    if (this.currentStep) {
      this.currentStep.status = 'complete';
    }
    this.stepIndex++;
    if (this.stepIndex < this.session.steps.length) {
      this.initStep();
    } else {
      this.done.emit();
    }
  }
}
