import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ApiService } from '../api.service';
import {Scenario, Session, Study} from '../interfaces';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import {Round} from '../round';
import {catchError, map, withLatestFrom} from 'rxjs/operators';
import {combineLatest, observable, Observable} from 'rxjs';

enum TrainingState {
  'LEMON', 'IMAGERY', 'INTRO', 'TRAINING', 'PSYCHOED', 'VIVIDNESS', 'READINESS', 'SUMMARY', 'FINAL_SUMMARY', 'CREATE'
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
  lemonExercise: Session[] = [];
  readinessRulers: Session[] = [];
  vividness: Session[] = [];
  vividIndexes = [1, 2, 20, 40];
  psychoed: Session[] = [];
  psychoedSession: Session;
  psychoedRoundIndex = -1; // The (0 based) index of the round that should be followed by psycho-education. -1 for none.
  createScenario: Session[] = [];
  createScenarioRoundIndex = -1; // The (0 based) index of the round that should be followed by psycho-education. -1 for none.
  imageryPrime: Session[] = [];
  lemonExerciseCompleted = false;
  readinessCompleted = false;
  imageryPrimeCompleted = false;
  sessionIndex = 0;
  stepIndex = 0;
  currentSession: Session;
  indicatorSessions: Session[];
  totalRounds = 4;
  scenariosPerRound = 10;
  totalScore = 0;
  roundIndex = 0;
  round: Round;
  rounds: Round[];  // Training is broken up into a series of rounds.
  scenarioIndex = 1;
  pageCount: number;
  increment: number;
  study: Observable<Study>;
  connectionError: Observable<Boolean>;
  /**
   *   Possible conditions:  TRAINING, TRAINING_ED, TRAINING_CREATE, TRAINING_30
   */


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
    this.study = this.getStudy();
    this.connectionError = this.getConnectionError();

    this.route.url.pipe(
      withLatestFrom(this.route.paramMap, this.route.queryParamMap)
    ).subscribe(([url, paramMap, queryParamMap]) => {
      const testing = (queryParamMap.get('testing') === 'true' || false);
      this.sessionIndex = +(paramMap.get('session') || 1) - 1;
      this.study.subscribe(study => {
        console.log('Study is:', study);
        console.log('Lemon Complete?', this.lemonExerciseCompleted);
        this.setupCondition(study.conditioning, testing);
        this.loadIntro(this.sessionIndex);
        this.loadReadinessRulers();
        this.loadVividness();
        this.loadImageryPrime();
        this.loadTraining(study);
        this.loadIndicatorSessions();
        this.loadLemonExercise();
        this.loadPsyched(study);
        this.loadCreateScenario();
        if (study.currentSession === 'firstSession' && !this.lemonExerciseCompleted) {
          console.log('Setting state to lemon.');
          this.state = this.states.LEMON;
        }
      });
    });
  }

  setupCondition(condition: String, testing: boolean) {
    if (condition === 'TRAINING_30') {
      this.totalRounds = 3;
      this.vividIndexes = [1, 2, 20, 30];
    } else if (condition === 'TRAINING_ED') {
      this.psychoedRoundIndex = 1; // Show training after completing the second round.
    } else if (condition === 'TRAINING_CREATE') {
      this.createScenarioRoundIndex = 3;
    }
    if (testing) {
      this.scenariosPerRound = 3;
    }
  }

  ready() {
    return this.sessions != null &&
      this.readinessRulers != null &&
      this.sessions.length > 0 &&
      this.psychoedSession != null &&
      this.readinessRulers.length > 0 &&
      this.vividness.length > 0 &&
      this.imageryPrime.length > 0;
  }

  scenariosToRounds(scenarios, study: Study) {
    console.log('scenarios to rounds');
    let index = 0;
    scenarios = scenarios.slice(0, this.totalRounds * this.scenariosPerRound);
    console.log('Total Rounds:', this.totalRounds);
    console.log('Total Scenarios: ', scenarios.length);
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


  loadTraining(study: Study) {
    // Pull the training from the api, split it into a series of rounds
    this.api.getTrainingCSV(study.currentSession).subscribe(scenarios => {
      if (scenarios.length !== 40) {
        throw Error('There must be 40 scenarios! There are only ' + scenarios.length);
      }
      this.loadProgress(scenarios, study);
    });
  }

  findScenarioByName(scenarios: Scenario[], name: string): Scenario {
    for (const s of scenarios) {
      if (s.title === name) {
        return s;
      }
    }
  }

  loadProgress(scenarios, study: Study) {
    console.log('Loading Progress');
    this.api.getScenarios().subscribe(progress => {
      if (progress.length === 0) {
        this.scenariosToRounds(scenarios, study);
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
        this.scenariosToRounds(scenarios, study);
      }
    }, error1 => {
      console.log('Backend not responding, loading the scenarios without progress.');
      this.scenariosToRounds(scenarios, study);
    });
  }

  loadIntro(sessionIndex) {
    this.api.getTrainingIntro().subscribe(sessions => {
      this.sessions = sessions;
      this.currentSession = this.sessions[sessionIndex];
      this.currentSession.startTime = performance.now();
    });
  }

  loadPsyched(study: Study) {
    this.api.getControlSessions().subscribe(sessions => {
      this.psychoed = sessions;
      this.psychoedSession = sessions[study.currentSessionIndex];
    });
  }

  loadCreateScenario() {
    this.api.getCreateScenario().subscribe(sessions => {
      this.createScenario = sessions;
    });
  }

  loadLemonExercise() {
    this.api.getLemonExercise().subscribe(sessions => {
      this.lemonExercise = sessions;
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

  lemonComplete() {
    this.lemonExerciseCompleted = true;
    this.state = this.states.IMAGERY;
  }

  imageryComplete() {
    this.imageryPrimeCompleted = true;
    this.state = this.states.INTRO;
  }

  introComplete() {
    this.state = this.states.TRAINING;
    this.nextTraining();
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

  psychoedComplete() {
    this.state = this.states.TRAINING;
    this.nextRound();
  }

  createComplete() {
    this.state = this.states.TRAINING;
    this.nextRound();
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
    if (this.vividIndexes.indexOf(this.scenarioIndex - 1) >= 0) {
      this.vividIndexes.splice( this.vividIndexes.indexOf(this.scenarioIndex - 1), 1 );
      this.state = this.states.VIVIDNESS;
      this.stepIndex--;
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
      console.log(`Next Training Called.  Current score is ${this.round.roundScore()}`);
      this.round.next(correct);
    }
  }

  nextRound() {
    console.log('The round index is ', this.roundIndex);
    if (this.roundIndex === this.psychoedRoundIndex) {
      this.state = this.states.PSYCHOED;
      this.psychoedRoundIndex = -1;
    } else if (this.roundIndex === this.createScenarioRoundIndex) {
        this.state = this.states.CREATE;
        this.createScenarioRoundIndex = -1;
    } else if (this.isComplete()) {
        for (const r of this.rounds) {
          this.totalScore += r.roundScore();
        }
      this.state = this.states.FINAL_SUMMARY;
    } else {
      this.state = this.states.TRAINING;
      this.roundIndex++;
      this.round = this.rounds[this.roundIndex];
      this.round.next();
    }

  }

  defaultStudy(): Observable<Study> {
    return this.route.url.pipe(
      withLatestFrom(this.route.paramMap, this.route.queryParamMap)).pipe(
        map(([url, paramMap, queryParamMap]) => {
        const study = {
          name: 'default',
          conditioning: 'TRAINING',
          currentSession: 'firstSession',
          currentSessionIndex: 0
        };
        study.currentSessionIndex = +paramMap.get('session') - 1;
        switch (paramMap.get('session')) {
          case('1'):
            study.currentSession = 'firstSession';
            break;
          case('2'):
            study.currentSession = 'secondSession';
            break;
          case('3'):
            study.currentSession = 'thirdSession';
            break;
          case('4'):
            study.currentSession = 'fourthSession';
            break;
        }
        if (queryParamMap.has('condition')) {
          study.conditioning = queryParamMap.get('condition');
        }
        return study;
      }));
  }

  getStudy(): Observable<Study> {
    return this.api.getStudy().pipe(catchError(err => {
      return this.defaultStudy();
    }));
  }

  getConnectionError(): Observable<Boolean> {
    return this.getStudy().pipe(map(study => {
      if (study.conditioning === 'CONTROL') {
        return true;
      } else {
        return !(study.currentSessionIndex - 1 === this.sessionIndex);
      }
    }));
  }
}



