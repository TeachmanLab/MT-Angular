import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChildren} from '@angular/core';
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
export class FillInTheBlankComponent implements OnInit, AfterViewInit {

  defaultMax = 25;
  defaultMin = 3;
  maxLength = 0;
  minCharacters = this.defaultMin;
  word: FormControl;
  matcher = new MyErrorStateMatcher();
  startTime: number;
  endTime: number;
  completed = false;
  force_focus = false;

  @Input()
  fillInBlank: FillInBlank;

  @Output()
  done: EventEmitter<boolean> = new EventEmitter();

  @Output()
  event: EventEmitter<ElementEvent> = new EventEmitter();

  error: string;
  placeholder: string;
  submitButtonText: string;

  constructor() {
    console.log('Fill in the Blank is:' , this.fillInBlank);
  }

  @ViewChildren('input') vc;

  ngAfterViewInit() {
    /**
     * Focus the input element when this is loaded.
     */
    if (this.force_focus) {
      this.vc.first.nativeElement.focus();
    }
  }

  ngOnInit() {
    console.log('Fill in the Blank is:' , this.fillInBlank);
    this.startTime = performance.now();
    if (!this.fillInBlank.placeholder) {
      this.fillInBlank.placeholder = 'PLEASE FILL IN THE BLANK:';
    }
    this.maxLength = this.fillInBlank.maxCharacters > 0 ?  this.fillInBlank.maxCharacters : this.defaultMax;
    this.minCharacters = this.fillInBlank.minCharacters > 0 ?  this.fillInBlank.minCharacters : this.defaultMin;
    this.placeholder = this.fillInBlank.placeholder;
    this.submitButtonText = this.fillInBlank.submitButtonText || 'Submit';
    this.word = new FormControl('', [
      Validators.required,
      Validators.minLength(this.minCharacters), wordValidator,
      Validators.maxLength(this.maxLength)]);
  }

  submitWord(word: string) {
      if (!this.word.valid || this.completed) { return; }
      this.endTime = performance.now();
      this.placeholder = '';
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
