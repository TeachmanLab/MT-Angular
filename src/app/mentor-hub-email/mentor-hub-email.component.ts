import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-mentor-hub-email',
  templateUrl: './mentor-hub-email.component.html',
  styleUrls: ['./mentor-hub-email.component.scss']
})
export class MentorHubEmailComponent implements OnInit, AfterViewInit {

  emailForm: FormGroup;
  @ViewChild('emailElement') _emailElement: ElementRef;


  @Output()
  emailCollected: EventEmitter<String> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  onSubmit(): void {
    this.emailCollected.emit(this.emailForm.get('email').value);
  }

  ngOnInit() {
    this.emailForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')
      ]),
      over18: new FormControl( false, [
      Validators.requiredTrue
      ])
    });
  }

  ngAfterViewInit() {
    this._emailElement.nativeElement.focus();
  }

  get email() { return this.emailForm.get('email'); }




}
