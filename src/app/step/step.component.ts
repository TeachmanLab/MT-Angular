import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Step} from '../interfaces';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

  @Input()
  step: Step;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  allDone() {
    this.done.emit();
  }
}
