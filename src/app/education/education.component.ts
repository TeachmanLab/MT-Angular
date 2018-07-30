import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Education, EducationSession, Intro, Question} from '../interfaces';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: [
    './education.component.scss',
  ]
})
export class EducationComponent implements OnInit {

  @Input()
  education: Education;
  question: Question;
  questionIndex: number;
  sectionComplete: boolean;
  numQuestions: number;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor( 
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.sectionComplete = false;
    this.questionIndex = -1;
    this.numQuestions = this.education.questions.length;
    this.questionService.setLastQuestion(this.education.questions[this.numQuestions - 1])
    this.nextQuestion();
  }

  continueButtonVisible() {
    return this.sectionComplete;
  }

  nextQuestion() {
    this.questionIndex++;
    if (this.questionIndex < this.numQuestions) {
      this.question = this.education.questions[this.questionIndex];
    } else {
      this.sectionComplete = true;
    }
  }

  allDone() {
    this.done.emit();
  }

}
