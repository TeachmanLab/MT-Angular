import {Injectable } from '@angular/core';
import {Question } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  lastQuestion: Question;

  constructor(
  ) { }

  setLastQuestion(lastQuestion: Question) {
    this.lastQuestion = lastQuestion;
  }

  getLastQuestion() {
    return this.lastQuestion;
  }

}