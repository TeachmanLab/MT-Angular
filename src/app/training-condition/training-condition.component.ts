import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Scenario, Session} from '../interfaces';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-training-condition',
  templateUrl: './training-condition.component.html',
  styleUrls: ['./training-condition.component.scss']
})
export class TrainingConditionComponent implements OnInit {

    totalRounds = 4;
    scenariosPerRound: number;
    currentRound: number;
    scenarios: Scenario[];
    rounds: Array<any>;

    training: any;  // Eventually need to pull a common structure into this.

    constructor(private api: ApiService) {}

    ngOnInit() {
      this.currentRound = 0;
      this.loadTraining();''
    }

    getScenariosForRound() {
      return this.scenarios.slice(this.scenariosPerRound * this.currentRound,
                            this.scenariosPerRound);
    }

    loadTraining() {
      this.api.getTrainingCSV().subscribe(scenarios => {
        this.scenarios = scenarios;
        this.scenariosPerRound = this.scenarios.length / this.totalRounds;
        this.currentRound = 0;
        this.rounds = Array(this.totalRounds);
      });
    }

    nextRound() {
      this.currentRound++;
    }



}
