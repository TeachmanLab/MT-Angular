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
  @Input() sessions: Session[];
  @Input() sessionIndex: number;
  stepIndex: number;
  currentStep: Step;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  @Output()
  finalPageCount: EventEmitter<number> = new EventEmitter(); // pass along page count to training for starting scenarios

  constructor(
    private api: ApiService
  ) {}

  ngOnInit() {
    this.session.startTime = performance.now();
    this.stepIndex = 0;
  }

  ngOnChanges() {
    // console.log('The Session was changed!');
    this.api.getProgress().subscribe(progress => {
      if (progress['sessionIndex'].toString() === this.sessionIndex) {
        this.stepIndex = progress['stepIndex'];
        this.initStep();
      } else {
        this.initStep();
      }
    });
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

  previousStep() {
    console.log('Previous Step called, loading the previous step!');
    this.currentStep.status = 'paused';
    this.stepIndex--;
    if (this.session.steps[this.stepIndex]) {
      this.initStep();
    }
  }

  pageCount(event) {
    this.finalPageCount.emit(event);
  }
}
