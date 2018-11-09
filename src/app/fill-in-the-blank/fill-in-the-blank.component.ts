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
  word = new FormControl('', [Validators.required, Validators.minLength(3)]);
  matcher = new MyErrorStateMatcher();

  @Output()
  done: EventEmitter<boolean> = new EventEmitter();

  @Output()
  buttonPressed: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  submitWord(word: string) {
    this.buttonPressed.emit(word);
    this.done.emit(true);
  }
}
