import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ElementEvent, Slider} from '../interfaces';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input()
  slider: Slider;

  clicked = false;
  value = 0;
  preferNotToAnswer = false;
  startTime: number;
  endTime: number;
  completed = false;

  @Output()
  updated: EventEmitter<ElementEvent> = new EventEmitter();

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.startTime = performance.now();
  }

  updateValue($event) {
    this.endTime = performance.now();
    this.clicked = true;
    this.value = $event.target.value;
    this.valueUpdated();
  }

  togglePreferNotToAnswer($event) {
    this.endTime = performance.now();
    this.preferNotToAnswer = $event.target.checked;
    this.valueUpdated();
  }

  sliderStyle() {
    if (this.clicked && !this.preferNotToAnswer) {
      return 'clicked';
    } else {
      return 'disabled';
    }
  }

  valueUpdated(): void {
    if (!this.completed) {
      this.done.emit(true);
      this.completed = true;
    }
    this.endTime = performance.now();
    const event: ElementEvent = {
      trialType: this.slider.type,
      stimulus: this.slider.content.toString(),
      stimulusName: this.slider.stimulusName,
      buttonPressed: this.value.toString(),
      correct: true,
      rtFirstReact: this.endTime - this.startTime,
      rt: this.endTime - this.startTime
    };
    this.updated.emit(event);
  }

}
