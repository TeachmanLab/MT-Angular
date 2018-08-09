import {Injectable } from '@angular/core';
import {Question, Scenario, Highlight, ThoughtBubble } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class LastService {

  lastQuestion: Question;
  lastScenario: Scenario;
  lastHighlight: Highlight;
  lastThoughtBubble: ThoughtBubble;

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

  setLastHighlight(lastHighlight: Highlight) {
    this.lastHighlight = lastHighlight;
  }

  getLastHighlight() {
    return this.lastHighlight;
  }

  setLastThoughtBubble(thoughtBubble: ThoughtBubble) {
    this.lastThoughtBubble = thoughtBubble;
  }

  getLastThoughtBubble() {
    return this.lastThoughtBubble;
  }

}