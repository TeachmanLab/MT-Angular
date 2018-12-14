import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Scenario, Session } from '../interfaces';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  sessions: Session[];
  sessionIndex = 0;
  currentSession: Session;
  indicatorSessions: Session[];

  totalRounds = 4;
  roundIndex = 0;
  round: Round;
  rounds: Round[];  // Training is broken up into a series of rounds.
  showSummary = false;
  scenarioIndex = 1;
  pageCount: number;
  increment: number;
  connectionError = false;

  @Input() setSessionIndex: number;

  @Output() done: EventEmitter<any> = new EventEmitter();

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.setSessionIndex) {
      this.sessionIndex = this.setSessionIndex - 1;
    }
    this.getProgress();
    this.loadIntro();
    this.loadIndicatorSessions();
    this.checkStudy();
  }

  getProgress() {
    this.api.getProgress().subscribe(progress => {
      if (progress['sessionIndex'] === this.sessionIndex) {
        if (progress['stepIndex'] > this.currentSession.steps.length) {
          this.roundIndex = Math.floor((progress['stepIndex'] - this.currentSession.steps.length) / this.increment );
          // this.scenarioIndex = this.currentSession.steps.length + (this.roundIndex * this.increment); // sets scenario index to beginning of round for returning users
          this.scenarioIndex = progress['stepIndex'] - this.currentSession.steps.length + 1; // sets scenario back to the scenario that the user was last on
        } else {
          this.done.emit();
        }
      }
    });
  }

  loadIntro() {
    this.api.getTrainingSessions().subscribe(sessions => {
      this.sessions = sessions;
      this.route.params.subscribe(params => {
        if (params && params.hasOwnProperty('session')) {
          this.sessionIndex = params['session'] - 1;
          if (this.sessions[this.sessionIndex]) {
            this.currentSession = this.sessions[this.sessionIndex];
          } else {
            this.currentSession = this.sessions[0];
          }
        } else {
          this.currentSession = this.sessions[this.sessionIndex];
        }
      });
      this.currentSession.startTime = performance.now();
      this.loadTraining();
    });
  }

  loadIndicatorSessions() {
    this.api.getTrainingSessionIndicators().subscribe(sessions => {
      this.indicatorSessions = sessions;
    });
  }

  sessionComplete() {
    this.nextTraining();
  }

  stepPageCount(event) {
    this.pageCount = event; // record the ending pageCount from the session steps before launching into the scenarios
  }

  updatePageCount(event) {
    this.pageCount = event; // update the pageCount as the users work through the scenarios
  }

  loadTraining() {
    // Pull the training from the api, split it into a series of rounds
    this.api.getTrainingCSV(this.currentSession.session).subscribe(scenarios => {
      let index = 0;
      // scenarios = scenarios.slice(0, 5);
      this.increment = Math.floor(scenarios.length / this.totalRounds);
      this.rounds = [];
      for (let i = 0; i < this.totalRounds - 1; i++) {
        this.rounds.push(new Round(scenarios.slice(index, index + this.increment)));
        index += this.increment;
      }
      if (index < scenarios.length) {
        this.rounds.push(new Round(scenarios.slice(index)));
      }
      this.totalRounds = this.rounds.length;
    });
    this.getProgress();
  }

  isComplete(): boolean {
    return (this.roundIndex >= this.totalRounds - 1);
  }

  close() {
    console.log('Redirecting to ' + environment.redirect);
    window.location.href = environment.redirect;
  }

  nextTraining(correct = true) {
    if (!this.round) {
      this.round = this.rounds[this.roundIndex];
      if (!this.connectionError) {
        const index = this.scenarioIndex - (this.increment * this.roundIndex) - 2;
        if (index > -2) {
          this.round.index = index;
        }
      }
      this.round.next(correct);
    } else if (this.round.isComplete()) {
      this.scenarioIndex++;
      this.round.next(correct);
      this.showSummary = true;
    } else {
      this.scenarioIndex++;
      this.round.next(correct);
    }
  }

  nextRound() {
    this.showSummary = false;
    if (this.isComplete()) {
      this.done.emit();
    } else {
      this.roundIndex++;
      this.round = this.rounds[this.roundIndex];
      this.round.next();
    }

  }

  checkStudy() {
    this.api.getStudy().subscribe(study => {
      if (study.conditioning === 'NEUTRAL') {
        this.connectionError = true;
      } else {
        this.connectionError = !(study.currentSession['index'] - 1 === this.sessionIndex);
      }
    });
  }

}


class Round {
  scenario?: Scenario;
  index = -1;

  constructor(public scenarios: Scenario[]) {
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
