import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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
  word = new FormControl('', [Validators.required, Validators.minLength(3),
    wordValidator, Validators.maxLength(25)]);
  matcher = new MyErrorStateMatcher();

  @Output()
  done: EventEmitter<boolean> = new EventEmitter();

  @Output()
  buttonPressed: EventEmitter<string> = new EventEmitter();

  error: string;

  constructor() { }

  ngOnInit() {
  }



  submitWord(word: string) {
      this.buttonPressed.emit(word);
      this.done.emit(true);
  }
}

function wordValidator(control: FormControl) {
  const word = control.value;
  const threeLetters = new RegExp('[a-z]{3}', 'i');
  const hasVowel = new RegExp('[aeiou]+', 'i');
  const hasCon = new RegExp('[bcdfghjklmnpqrstvxzwy]', 'i');
  console.log("checking if word is valid.");
  if (threeLetters.test(word) && hasVowel.test(word) && hasCon.test(word)) {
    return null;
  } else {
    console.log("nope. not a word. " + threeLetters.test(word) + " " + hasVowel.test(word) + " " + hasCon.test(word) );
    return {'isWord': 'Please enter a valid word'};
  }
}
