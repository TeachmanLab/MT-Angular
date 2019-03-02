import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Scenario, Session } from '../interfaces';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import {Round} from '../round';

enum TrainingState {
  'INTRO', 'IMAGERY', 'TRAINING', 'VIVIDNESS', 'READINESS', 'SUMMARY', 'FINAL_SUMMARY'
}

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  states = TrainingState;
  state = TrainingState.INTRO;

  sessions: Session[];
  readinessRulers: Session[] = [];
  vividness: Session[] = [];
  vividIndexes = [1, 2, 20, 40];
  imageryPrime: Session[] = [];
  readinessCompleted = false;
  imageryPrimeCompleted = false;
  readinessScenarioIndex = 6; // Show the readiness rulers just prior to this session.
  sessionIndex = 0;
  stepIndex = 0;
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

  scenariosToRounds(scenarios) {
    let index = 0;
    // for shortening stuff up. scenarios = scenarios.slice(0, 15);
    this.increment = Math.floor(scenarios.length / this.totalRounds);
    this.rounds = [];
    let round = new Round();
    for (const scenario of scenarios) {
      if (index % this.increment === 0) {
        round = new Round();
        this.rounds.push(round);
        if (scenario.status !== undefined && index > 0) {
          this.roundIndex++;
        }
      }
      round.add(scenario);
      if (scenario.status !== undefined) {
        round.index++;
      }
      index++;
    }
    this.totalRounds = this.rounds.length;
    this.round = this.rounds[this.roundIndex];
  }


  loadTraining() {
    // Pull the training from the api, split it into a series of rounds
    this.api.getTrainingCSV(this.currentSession.session).subscribe(scenarios => {
      if (scenarios.length !== 40) {
        throw Error('There must be 40 scenarios! There are only ' + scenarios.length);
      }
      this.loadProgress(scenarios);
    });
  }

  findScenarioByName(scenarios: Scenario[], name: string): Scenario {
    for (const s of scenarios) {
      if (s.title === name) {
        return s;
      }
    }
  }

  loadProgress(scenarios) {
    this.api.getScenarios().subscribe(progress => {
      if (progress.length === 0) {
        this.scenariosToRounds(scenarios);
        return;
      } else {
        const lastProgress = progress[progress.length - 1];
        this.scenarioIndex = lastProgress.stepIndex;
        this.state = TrainingState.TRAINING;
        this.stepIndex = lastProgress.stepIndex;
        let eventIndex = 0;
        for (const eventRecord of progress) {
          const scenario = this.findScenarioByName(scenarios, eventRecord.stimulusName);
          if (scenario.numAnswer === undefined) {scenario.numAnswer = 0; }
          if (scenario.numCorrect === undefined) {scenario.numCorrect = 0; }
          scenario.numAnswer++;
          if (eventRecord.correct) {
            scenario.numCorrect++;
          }
          if (scenario.numAnswer === scenario.numCorrect) {
            scenario.score = 1;
            scenario.status = 'complete';
          } else {
            scenario.score = 0;
            scenario.status = 'error';
          }
          if (eventIndex === progress.length - 1) {
            scenario.status = 'active';
          }
          eventIndex++;
        }
        this.scenariosToRounds(scenarios);
      }
    }, error1 => {
      console.log('Backend not responding, loading the scenarios without progress.');
      this.scenariosToRounds(scenarios);
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
    this.state = this.states.IMAGERY;
    this.stepIndex++;
  }

  readinessComplete() {
    this.readinessCompleted = true;
    this.state = this.states.TRAINING;
    this.nextTraining();
  }

  vividnessComplete() {
    this.state = this.states.TRAINING;
    this.nextTraining();
  }

  imageryComplete() {
    this.imageryPrimeCompleted = true;
    this.state = this.states.TRAINING;
    this.nextTraining();
  }

  scenarioComplete($event) {
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


  isComplete(): boolean {
    return (this.roundIndex >= this.totalRounds - 1);
  }

  close() {
    window.location.href = environment.redirect;
  }

  nextTraining(correct = true) {
    this.stepIndex++;
    if (this.currentSession.session === 'firstSession' && this.scenarioIndex === this.readinessScenarioIndex &&
        !this.readinessCompleted) {
      this.state = this.states.READINESS;
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



