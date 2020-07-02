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
  @Input() showIndicator ? = true;
  @Input() checkProgress ? = true;
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
    if (!this.checkProgress) {
      console.log('So not checking progress.');
      this.stepIndex = 0;
      this.initStep();
      return;
    }
    this.api.getProgress().subscribe(progress => {
        if (progress['sessionIndex'] === this.sessionIndex) {
          if (progress['stepIndex'] < this.session.steps.length) {
            this.stepIndex = progress['stepIndex'];
            this.initStep();
          } else {
            this.done.emit();
          }
        } else {
          this.initStep();
        }
      },
      error => {
        this.stepIndex = 0;
        this.initStep();
      });
  }

  initStep() {
    this.currentStep = this.session.steps[this.stepIndex];
    this.currentStep.status = 'active';
    // console.log('The current Step is ' + JSON.stringify(this.currentStep));
  }

  nextStep(correct= true) {
    console.log('Next Step called, loading the next step!', this.stepIndex);
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
