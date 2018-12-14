import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {ElementEvent, FillInBlank} from '../interfaces';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-fill-in-the-blank',
  templateUrl: './fill-in-the-blank.component.html',
  styleUrls: ['./fill-in-the-blank.component.scss']
})
export class FillInTheBlankComponent implements OnInit {
  word = new FormControl('', [Validators.required, Validators.minLength(3)]);
  matcher = new MyErrorStateMatcher();
  startTime: number;
  endTime: number;


  @Output()
  done: EventEmitter<boolean> = new EventEmitter();

  @Output()
  event: EventEmitter<ElementEvent> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.startTime = performance.now();
  }

  submitWord(word: string) {
    this.endTime = performance.now();
    const fillInBlank: FillInBlank = {type: 'FillInBlank'};  // forcing some type checking to keep types consistent.
    const event: ElementEvent = {
      trialType: fillInBlank.type,
      stimulus: '',
      stimulusName: '',
      buttonPressed: word,
      correct: true,
      rtFirstReact: this.endTime - this.startTime,
      rt: this.endTime - this.startTime
    };
    this.event.emit(event);
    this.done.emit(true);
  }
}
