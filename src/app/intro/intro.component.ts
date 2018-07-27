import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Intro, Question } from '../interfaces';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: [
    './intro.component.scss',
  ],
})
export class IntroComponent implements OnInit {

  @Input()
  intro: Intro;
  question: Question;
  question_index: number;
  questions_complete: boolean;
  num_questions: number;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.questions_complete = false;
    this.question_index = -1;
    this.num_questions = this.intro.questions.length;
    this.nextQuestion();
  }

  nextQuestion() {
    this.question_index++;
    if (this.question_index < this.num_questions) {
      this.question = this.intro.questions[this.question_index];
    } else {
      this.questions_complete = true;
    }
  }

  allDone() {
    this.done.emit();
  }

}
