import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  defaultMax = 25;
  word: FormControl;
  matcher = new MyErrorStateMatcher();
  startTime: number;
  endTime: number;
  completed = false;

  @Input()
  fillInBlank: FillInBlank;

  @Output()
  done: EventEmitter<boolean> = new EventEmitter();

  @Output()
  event: EventEmitter<ElementEvent> = new EventEmitter();

  error: string;

  constructor() { }

  ngOnInit() {
    this.startTime = performance.now();
    const maxLength = this.fillInBlank.maxCharacters > 0 ?  this.fillInBlank.maxCharacters : this.defaultMax;
    this.word = new FormControl('', [Validators.required, Validators.minLength(3), wordValidator, Validators.maxLength(maxLength)]);
  }

  submitWord(word: string) {
      this.endTime = performance.now();
      const event: ElementEvent = {
        trialType: this.fillInBlank.type,
        stimulus: '',
        stimulusName: '',
        buttonPressed: word,
        correct: true,
        rtFirstReact: this.endTime - this.startTime,
        rt: this.endTime - this.startTime
      };
    this.event.emit(event);
    this.done.emit(true);
    this.completed = true;
  }
}

function wordValidator(control: FormControl) {
  const word = control.value;
  const threeLetters = new RegExp('[a-z]{3}', 'i');
  const hasVowel = new RegExp('[aeiou]+', 'i');
  const hasCon = new RegExp('[bcdfghjklmnpqrstvxzwy]', 'i');
  if (threeLetters.test(word) && hasVowel.test(word) && hasCon.test(word)) {
    return null;
  } else {
    return {'isWord': 'Please enter a valid word'};
  }
}
