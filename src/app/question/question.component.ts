import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Question } from '../interfaces';
import { interval } from 'rxjs';


enum QuestionStates {
  asking = 'asking',
  answered = 'answered',
  correct = 'correct',
  incorrect = 'incorrect'
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question;

  userAnswer: string;
  userAnswers: string[] = [];
  state: QuestionStates;
  waitPercent: number;
  incorrectAnswerSupplied = false;  // emit this value when complete.
  responseTimes: number[] = [];

  @Output()
  done: EventEmitter<boolean> = new EventEmitter();

  @Output()
  initialResponse: EventEmitter<number> = new EventEmitter();

  @Output()
  buttonPressed: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (this.question.completed) {
      if (this.question.answer) {
        this.state = QuestionStates.correct;
        this.allDone();
      }
    } else {
      this.state = QuestionStates.asking;
    }
    this.waitPercent = 0;
    this.question.content = this.question.question; // for populating pageData
    this.shuffleOptions(this.question.options); // shuffle answer options so that the positive isn't always on the left, negative on right.
  }

  selected(option: string) {
    this.responseTimes.push(performance.now());
    this.userAnswer = option;
    this.userAnswers.push(option);
    if (this.question.answer) {
      if (option === this.question.answer) {
        this.state = QuestionStates.correct;
        this.question.completed = true;
        this.waitAndEmit();
      } else {
        this.state = QuestionStates.incorrect;
        this.incorrectAnswerSupplied = true;
        this.makeThemWait();
      }
    } else {
      this.state = QuestionStates.answered;  // answer was acceptable.
      this.waitAndEmit();
    }
  }

  waitAndEmit() {
    const secondsCounter = interval(1000);
    const subscription = secondsCounter.subscribe(n => {
    this.allDone();
      subscription.unsubscribe();
    });
  }

  makeThemWait() {
    const secondsCounter = interval(500);
    this.waitPercent = 0;
    let counter = 0;
    const subscription = secondsCounter.subscribe(n => {
      counter++;
      this.waitPercent += 10;
      if (counter > 10) {
        this.ngOnInit();
        subscription.unsubscribe();
      }
    });
  }

  shuffleOptions(array) {
    // Randomize array element order in-place.
    // Using Durstenfeld shuffle algorithm.
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  allDone() {
    // console.log('Completed question');
    this.initialResponse.emit(this.responseTimes[0]);
    this.buttonPressed.emit(this.userAnswers[0]);
    this.done.emit(!this.incorrectAnswerSupplied);
  }
}
