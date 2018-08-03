import {Injectable } from '@angular/core';
import {Question, Scenario } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class LastService {

  lastQuestion: Question;
  lastScenario: Scenario;

  constructor(
  ) { }

  setLastQuestion(lastQuestion: Question) {
    this.lastQuestion = lastQuestion;
  }

  getLastQuestion() {
    return this.lastQuestion;
  }

  setLastScenario(lastScenario: Scenario) {
    this.lastScenario = lastScenario;
  }

  getLastScenario() {
    return this.lastScenario;
  }


}