import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Scenario, Session } from '../interfaces';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import {Round} from '../round';

enum TrainingState {
  'IMAGERY', 'INTRO', 'TRAINING', 'VIVIDNESS', 'READINESS', 'SUMMARY', 'FINAL_SUMMARY'
}

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  states = TrainingState;
  state = TrainingState.IMAGERY;

  sessions: Session[];
  readinessRulers: Session[] = [];
  vividness: Session[] = [];
  vividIndexes = [1, 2, 20, 40];
  imageryPrime: Session[] = [];
  readinessCompleted = false;
  imageryPrimeCompleted = false;
  readinessScenarioIndex = 6; // Show the readiness rulers just prior to this session.
  sessionIndex = 0;
  currentSession: Session;
  indicatorSessions: Session[];
  totalRounds = 4;
  totalScore = 0;
  roundIndex = 0;
  round: Round;
  rounds: Round[];  // Training is broken up into a series of rounds.
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
    this.loadIntro();
    this.loadIndicatorSessions();
    this.checkStudy();
  }

  ready() {
    return this.sessions != null && this.readinessRulers != null && this.sessions.length > 0 && this.readinessRulers.length > 0 && this.vividness.length > 0 && this.imageryPrime.length > 0;
  }

  getProgress() {
    this.api.getProgress().subscribe(progress => {
      if (progress['sessionIndex'] === this.sessionIndex) {
        if (progress['stepIndex'] > this.currentSession.steps.length) {
          this.roundIndex = Math.floor((progress['stepIndex'] - this.currentSession.steps.length) / this.increment );
          // sets scenario back to the scenario that the user was last on
          this.scenarioIndex = progress['stepIndex'];
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
      this.loadReadinessRulers();
      this.loadVividness();
      this.loadTraining();
      this.loadImageryPrime();
    });
  }

  loadReadinessRulers() {
    this.api.getReadinessRulers().subscribe(sessions => {
      this.readinessRulers = sessions;
    });
  }

  loadVividness() {
    this.api.getVividness().subscribe(sessions => {
      this.vividness = sessions;
    });
  }

  loadImageryPrime() {
    this.api.getImageryPrime().subscribe(sessions => {
      this.imageryPrime = sessions;
    });
  }

  loadIndicatorSessions() {
    this.api.getTrainingSessionIndicators().subscribe(sessions => {
      this.indicatorSessions = sessions;
    });
  }

  introComplete() {
//    this.currentSession = null;
    this.state = this.states.TRAINING;
  }

  readinessComplete() {
    this.readinessCompleted = true;
    this.state = this.states.TRAINING;
    this.nextTraining();
  }

  vividnessComplete() {
    console.log('Vividness complete, moving on...');
    this.state = this.states.TRAINING;
    this.nextTraining();
  }

  imageryComplete() {
    console.log('Imagery Prime complete, moving on...');
    this.imageryPrimeCompleted = true;
    this.state = this.states.INTRO;
    this.nextTraining();
  }

  scenarioComplete($event) {
    console.log('Scenario Completed');
    this.scenarioIndex++;
    this.state = this.states.TRAINING;
    this.nextTraining($event);
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
      // for shortening stuff up. scenarios = scenarios.slice(0, 15);
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
    window.location.href = environment.redirect;
  }

  nextTraining(correct = true) {
    if (this.currentSession.session === 'firstSession' && this.scenarioIndex === this.readinessScenarioIndex &&
        !this.readinessCompleted) {
      this.state = this.states.READINESS;
      console.log('Showing Readiness');
      return;
    } else if (this.vividIndexes.indexOf(this.scenarioIndex - 1) >= 0) {
      this.vividIndexes.splice( this.vividIndexes.indexOf(this.scenarioIndex - 1), 1 );
      this.state = this.states.VIVIDNESS;
      return;
    }
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
      this.round.next(correct);
      this.state = this.states.SUMMARY;
    } else {
      this.round.next(correct);
    }
  }

  nextRound() {
    this.state = this.states.TRAINING;
    if (this.isComplete()) {
      for (const r of this.rounds) {
        this.totalScore += r.roundScore();
      }
      this.state = this.states.FINAL_SUMMARY;

    } else {
      this.roundIndex++;
      this.round = this.rounds[this.roundIndex];
      this.round.next();
    }

  }


  checkStudy() {
    this.api.getStudy().subscribe(study => {
      if (study.conditioning === 'CONTROL') {
        this.connectionError = true;
      } else {
        this.connectionError = !(study.currentSession['index'] - 1 === this.sessionIndex);
      }
    });
  }

}



