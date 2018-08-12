import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Scenario} from '../interfaces';

@Component({
  selector: 'app-training-round',
  templateUrl: './training-round.component.html',
  styleUrls: ['./training-round.component.scss']
})
export class TrainingRoundComponent implements OnInit {

  @Input() roundNumber: number;
  @Input() scenarios: Scenario[];
  @Output() done: EventEmitter<any> = new EventEmitter();
  scenarioIndex: number;
  currentScenario: Scenario;

  constructor() { }

  ngOnInit() {
    this.scenarioIndex = -1;
    console.log('The scenarios are ' + JSON.stringify(this.scenarios))
    this.nextSession();
  }

  nextSession() {
    this.scenarioIndex++;
    console.log(`on session ${this.scenarioIndex} of ${this.scenarios.length}`);
    if (this.scenarioIndex < this.scenarios.length - 1) {
      this.currentScenario = this.scenarios[this.scenarioIndex];
    } else {
      this.done.emit(true);
    }
  }

}
