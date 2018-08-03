import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges } from '@angular/core';
import { Question, Scenario, Div } from '../interfaces'
import { LastService } from '../last.service';

@Component({
  selector: 'app-div',
  templateUrl: './div.component.html',
  styleUrls: ['./div.component.css']
})

export class DivComponent implements OnInit {

  @Input()
  div: Div

  currentQuestion: Question;
  questionIndex: number;
  numQuestions: number;

  currentScenario: Scenario;
  scenarioIndex: number;
  numScenarios: number;

  divType: string;

  @Output()
  done: EventEmitter<any> = new EventEmitter();
  questionChange: EventEmitter<Question> = new EventEmitter();
  scenarioChange: EventEmitter<Scenario> = new EventEmitter();

  constructor(
    private lastService: LastService
  ) { }

  ngOnInit() {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.div = changes.div.currentValue;
    this.init();
  }

  init() {

    if (this.div.questions) {
      
      this.questionIndex = 0;
      this.currentQuestion = this.div.questions[0];
      this.numQuestions = this.div.questions.length;
      this.lastService.setLastQuestion(this.div.questions[-1])
      
    } else if (this.div.scenarios) {

      this.scenarioIndex = 0;
      this.currentScenario = this.div.scenarios[0];
      this.numScenarios = this.div.scenarios.length;
      this.lastService.setLastScenario(this.div.scenarios[-1])
      
    } else {
      this.allDone()
    }
  }

  next(divType: string) {
    switch (divType) {
      case 'question': {
        this.questionIndex++;
        if (this.questionIndex < this.numQuestions) {
          this.currentQuestion = this.div.questions[this.questionIndex];
          this.questionChange.emit(this.currentQuestion);
        } else {
          this.allDone();
        }
        break;
      }
      case "scenario": {
        this.scenarioIndex++;
        if (this.scenarioIndex < this.numScenarios) {
          this.currentScenario = this.div.scenarios[this.scenarioIndex];
          this.scenarioChange.emit(this.currentScenario);
        } else {
          this.allDone();
        }
        break;
      }
    }
  }

  allDone() {
    console.log('completed div')
    this.done.emit();
  }

}
