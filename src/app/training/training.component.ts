import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from '../api.service';
import {Scenario} from '../interfaces';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  totalRounds = 15;
  roundIndex = 0;
  round: Round;
  rounds: Round[];  // Training is broken up into a series of rounds.
  showSummary = false;
  @Output() done: EventEmitter<any> = new EventEmitter();

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.loadTraining();
  }

  loadTraining() {
    // Pull the training from the api, split it into a series of rounds
    this.api.getTrainingCSV().subscribe(scenarios => {
      let index = 0;
      const increment = Math.floor(scenarios.length / this.totalRounds);
      this.rounds = [];
      for (let i = 0; i < this.totalRounds - 1; i++) {
        this.rounds.push(new Round(scenarios.slice(index, index + increment)));
        index += increment;
      }
      if (index < scenarios.length - 1) {
        this.rounds.push(new Round(scenarios.slice(index)));
      }
      this.totalRounds = this.rounds.length;
      this.next();
    });
  }

  isComplete(): boolean {
    return (this.roundIndex >= this.totalRounds - 1);
  }

  next(correct = true) {
    console.log('Next Called.');
    if (!this.round) {
      this.round = this.rounds[this.roundIndex];
    } else if (this.round.isComplete()) {
      this.round.next(correct);
      this.showSummary = true;
    } else {
      this.round.next(correct);
    }
  }

  nextRound() {
    this.showSummary = false;
    this.roundIndex++;
    if (this.isComplete()) {
      this.done.emit();
    } else {
      this.round = this.rounds[this.roundIndex];
    }

  }

}


class Round {
  scenario?: Scenario;
  index = -1;

  constructor(public scenarios: Scenario[]) {
    this.next();
  }

  isComplete(): boolean {
    return (this.index >= this.scenarios.length - 1);
  }

  next(correct = true) {
    if (this.scenario) {
      this.scenario.status = correct ? 'complete' : 'error';
    }
    this.index++;
    if (this.index < this.scenarios.length) {
      this.scenario = this.scenarios[this.index];
      this.scenario.status = 'active';
    } else {
      this.scenario = null;
    }
  }

  percentCorrect() {
    const errorCount = this.scenarios.filter(s => s.status === 'error').length;
    return (this.scenarios.length - errorCount) / this.scenarios.length;
  }

}
