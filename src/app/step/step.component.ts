import {Component, Input, OnInit} from '@angular/core';
import {Step} from '../interfaces';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

  @Input()
  steps: Step[];
  current_step: Step;
  step_index: number;
  num_step: number;
  on_last_step: boolean;
  new_session: boolean;

  constructor() { }

  ngOnInit() {
    console.log('List of steps for current step!!');
    console.log(this.on_last_step);
    this.step_index = -1;
    this.num_step = this.steps.length;
    this.on_last_step = false;
    this.nextStep();
  }

  nextStep() {
    this.step_index++;
    if (this.step_index < this.num_step) {
      this.current_step = this.steps[this.step_index];
    } else {
      this.on_last_step = true;
      this.new_session = true;
    }
  }

  continueButtonVisible() {
    return true;
  }

  allDone() {
    this.nextStep();
  }
}
