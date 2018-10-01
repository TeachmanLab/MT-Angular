import { Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { Step, Session } from '../interfaces';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit, OnChanges {

  @Input() session: Session;
  sessions: Session[];
  stepIndex: number;
  currentStep: Step;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor(
    private api: ApiService
  ) {}

  ngOnInit() {
    this.stepIndex = 0;
    this.initStep();
    this.api.getSessions().subscribe(sessions => {
      this.sessions = sessions;
    });
  }

  ngOnChanges() {
    // console.log('The Session was changed!');
    this.stepIndex = 0;
    this.initStep();
  }

  initStep() {
    this.currentStep = this.session.steps[this.stepIndex];
    this.currentStep.status = 'active';
    // console.log('The current Step is ' + JSON.stringify(this.currentStep));
  }

  nextStep(correct= true) {
    // console.log('Next Step called, loading the next step!');
    if (this.currentStep && correct) {
      this.currentStep.status = 'complete';
    } else if (this.currentStep) {
      this.currentStep.status = 'error';
    }
    this.stepIndex++;
    if (this.stepIndex < this.session.steps.length) {
      this.initStep();
    } else {
      this.done.emit();
    }
  }
}
