import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Question, Scenario, Div } from '../interfaces'
@Component({
  selector: 'app-div',
  templateUrl: './div.component.html',
  styleUrls: ['./div.component.css']
})

export class DivComponent implements OnInit {

  @Input()
  div: Div

  question: Question;
  questionIndex: number;
  questionsComplete: boolean;
  numQuestions: number;

  scenario: Scenario;
  scenarioIndex: number;
  scenariosComplete: boolean;
  numScenarios: number;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {

    if (this.div.questions) {
      this.questionsComplete = false;
      this.questionIndex = -1;
      this.numQuestions = this.div.questions.length;
      this.next('question');
    } else if (this.div.scenarios) {
      this.scenariosComplete = false;
      this.scenarioIndex = -1;
      this.numScenarios = this.div.scenarios.length;
      this.next('scenario');
    } else {
      this.allDone()
    }
  }

  next(type: string) {
    if (type === 'question') {
      this.questionIndex++;
      if (this.questionIndex < this.numQuestions) {
        this.question = this.div.questions[this.questionIndex];
        console.log(this.question);
      } else {
        this.questionsComplete = true;
        console.log('Emitting done after' + (this.questionIndex - 1) + 'questions');
        this.allDone();
      }
    } else if (type === "scenario") {
      this.scenarioIndex++;
      if (this.scenarioIndex < this.numScenarios) {
        this.scenario = this.div.scenarios[this.scenarioIndex];
        console.log(this.scenario);
      } else {
        this.scenariosComplete = true;
        this.allDone();
      }
    } else {
      console.log('Error: Unknown type for function next()');
    }
  }

  allDone() {
    this.done.emit();
  }

}
