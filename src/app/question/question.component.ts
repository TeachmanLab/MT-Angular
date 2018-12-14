import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import {ElementEvent, Question} from '../interfaces';
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
  startTime: number;
  firstReactionTime = 0;
  endTime: number;

  @Output()
  done: EventEmitter<boolean> = new EventEmitter();

  @Output()
  event: EventEmitter<ElementEvent> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.startTime = performance.now();
    this.updateQuestionState();
  }

  updateQuestionState() {
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
    this.shuffleOptions(this.question.options); // shuffle tanswer options so that the positive isn't always on the left, negative on right.
  }

  selected(option: string) {
    if (this.firstReactionTime === 0) {
      this.firstReactionTime = performance.now();
    }
    this.userAnswer = option;
    this.userAnswers.push(option);
    if (this.question.answer) {
      if (option === this.question.answer) {
        this.endTime = performance.now();
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
        this.updateQuestionState();
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
    const event: ElementEvent = {
      trialType: this.question.type,
      stimulus: this.question.question,
      stimulusName: '',
      buttonPressed: this.userAnswers.join(','),
      correct: !this.incorrectAnswerSupplied,
      rtFirstReact: this.firstReactionTime - this.startTime,
      rt: this.endTime - this.startTime
    };
    this.event.emit(event);
    this.done.emit(!this.incorrectAnswerSupplied);
  }
}
