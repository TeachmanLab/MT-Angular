import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Intro, Question, HTMLSection } from '../interfaces';
import { QuestionService } from '../question.service';


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
  questionIndex: number;
  questionsComplete: boolean;
  numQuestions: number;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor( 
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.questionsComplete = false;
    this.questionIndex = -1;
    this.numQuestions = this.intro.questions.length;
    this.questionService.setLastQuestion(this.intro.questions[this.numQuestions - 1])
    this.nextQuestion();
  }

  nextQuestion() {
    this.questionIndex++;
    if (this.questionIndex < this.numQuestions) {
      this.question = this.intro.questions[this.questionIndex];
    } else {
      this.questionsComplete = true;
    }
  }

  allDone() {
    this.done.emit();
  }

}
