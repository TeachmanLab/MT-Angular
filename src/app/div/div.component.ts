import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges } from '@angular/core';
import { Highlight, Question, Scenario, Div, ThoughtBubble } from '../interfaces'
import { LastService } from '../last.service';

@Component({
  selector: 'app-div',
  templateUrl: './div.component.html',
  styleUrls: ['./div.component.scss']
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

  currentHighlight: Highlight;
  highlightIndex: number;
  numHiglights: number;

  currentThoughtBubble: ThoughtBubble;
  thoughtBubbleIndex: number;
  numThoughtBubbles: number;

  divType: string;

  @Output()
  done: EventEmitter<any> = new EventEmitter();
  questionChange: EventEmitter<Question> = new EventEmitter();
  scenarioChange: EventEmitter<Scenario> = new EventEmitter();
  highlightChange: EventEmitter<Highlight> = new EventEmitter();  thoughtBubbleChange: EventEmitter<ThoughtBubble> = new EventEmitter();

  constructor(
    private lastService: LastService
  ) { }

  ngOnInit() {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.div.isFirstChange()) {
      console.log('New div');
      this.div = changes.div.currentValue;
      this.init();
    }
  }

  init() {

    if (this.div.questions) {
      
      this.questionIndex = 0;
      this.currentQuestion = this.div.questions[0];
      this.numQuestions = this.div.questions.length;
      this.lastService.setLastQuestion(this.div.questions[this.numQuestions - 1]);
      
    }
    
    if (this.div.scenarios) {

      this.scenarioIndex = 0;
      this.currentScenario = this.div.scenarios[0];
      this.numScenarios = this.div.scenarios.length;
      this.lastService.setLastScenario(this.div.scenarios[this.numScenarios - 1]);

    }
      
    if (this.div.highlights) {

      this.highlightIndex = 0;
      this.currentHighlight = this.div.highlights[0];
      this.numHiglights = this.div.highlights.length;
      this.lastService.setLastHighlight(this.div.highlights[this.numHiglights - 1]);
      
    }

    if (this.div.thoughtBubbles) {

      this.thoughtBubbleIndex = 0;
      this.currentThoughtBubble = this.div.thoughtBubbles[0];
      console.log(this.currentThoughtBubble);
      this.numThoughtBubbles = this.div.thoughtBubbles.length;
      this.lastService.setLastThoughtBubble(this.div.thoughtBubbles[this.numThoughtBubbles - 1]);

    }

    if (!(this.div.questions || this.div.scenarios || this.div.highlights || this.div.thoughtBubbles)) {
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
      case "higlight": {
        this.highlightIndex++;
        if (this.highlightIndex < this.numHiglights) {
          this.currentHighlight = this.div.highlights[this.highlightIndex];
          this.highlightChange.emit(this.currentHighlight);
        } else {
          this.allDone();
        }
        break;
      }

      case "thoughtBubble": {
        this.thoughtBubbleIndex++;
        if (this.thoughtBubbleIndex < this.numHiglights) {
          this.currentThoughtBubble = this.div.thoughtBubbles[this.thoughtBubbleIndex];
          this.thoughtBubbleChange.emit(this.currentThoughtBubble);
        } else {
          this.allDone();
        }
        break;
      }
    }
  }

  allDone() {
    console.log('Completed div');
    this.done.emit();
  }

}
