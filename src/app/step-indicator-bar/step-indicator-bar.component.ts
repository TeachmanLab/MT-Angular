import { Component, Input, OnInit } from '@angular/core';
import { Step, Session } from '../interfaces';


@Component({
  selector: 'app-step-indicator-bar',
  templateUrl: './step-indicator-bar.component.html',
  styleUrls: ['./step-indicator-bar.component.scss']
})
export class StepIndicatorBarComponent implements OnInit {
  @Input() steps: Step[];
  @Input() currentStep: Step;
  @Input() currentSession: Session;

  constructor() { }

  ngOnInit() {
  }

}
