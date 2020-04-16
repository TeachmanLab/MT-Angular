import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ApiService } from '../api.service';
import {Scenario, Session, Study} from '../interfaces';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import {Round} from '../round';
import {catchError, map, withLatestFrom} from 'rxjs/operators';
import {combineLatest, observable, Observable} from 'rxjs';

enum TrainingState {
  // 'LEMON',
  'IMAGERY', 'INTRO', 'TRAINING', 'PSYCHOED', 'PSYCHOED_FOLLOWUP', 'VIVIDNESS', 'READINESS', 'CREATE', 'FLEXIBLE_THINKING', 'SUMMARY', 'FINAL_SUMMARY'
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
  // lemonExercise: Session[] = [];
  // lemonExerciseCompleted = false;
  readinessRulers: Session[] = [];
  vividness: Session[] = [];
  vividIndexes = [1];
  psychoed: Session[] = [];
  psychoedFollowup: Session[] = [];
  psychoedSession: Session;
  psychoedRoundIndex = -1; // The (0 based) index of the round that should be followed by psycho-education. -1 for none.
  createScenario: Session[] = [];
  createScenarioRoundIndex = 1; // The (0 based) index of the round that should be followed by creating your own scenario. -1 for none.
  imageryPrime: Session[] = [];
  flexible_thinking: Session[] = [];
  // Need to check with Dan that I didn't mess up the index, here, after removing lemon exercise. Hmm... - Anna 2/11/20
  flexibleThinkingRoundIndex = -1; // The (0 based) index of the round that should be   lemonExerciseCompleted = false;
  readinessCompleted = false;
  imageryPrimeCompleted = false;
  sessionIndex = 0;
  stepIndex = 0;
  currentSession: Session;
  indicatorSessions: Session[];
  totalRounds = 2;
  scenariosPerRound = 3;
  totalScore = 0;
  roundIndex = 0;
  round: Round;
  rounds: Round[];  // Training is broken up into a series of rounds.
  scenarioIndex = 1;
  pageCount: number;
  increment: number;
  study: Observable<Study>;
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
    this.study = this.getStudy();

    this.route.url.pipe(
      withLatestFrom(this.route.paramMap, this.route.queryParamMap)
    ).subscribe(([url, paramMap, queryParamMap]) => {
      const testing = (queryParamMap.get('testing') === 'true' || false);
      this.study.subscribe(study => {
        console.log('Study is:', study);
        // console.log('Lemon Complete?', this.lemonExerciseCompleted);
        this.setupCondition(study.conditioning, testing);
        this.loadIntro(study.currentSession.index - 1, study.conditioning);
        this.loadReadinessRulers();
        this.loadVividness();
        // this.loadFlexibleThinking();
        this.loadImageryPrime();
        this.loadTraining(study);
        this.loadIndicatorSessions();
        this.loadPsychoEdFollowup();
        // this.loadLemonExercise();
        this.loadPsyched(study);
        this.loadCreateScenario();

        // if (study.currentSession.name === 'firstSession' && !this.lemonExerciseCompleted) {
        //   console.log('Setting state to lemon.');
        //   this.state = this.states.LEMON;
        // }
      });
    });
  }

  setupCondition(condition: String, testing: boolean) {
    if (condition === 'TRAINING_30') {
      this.totalRounds = 2;
      this.flexibleThinkingRoundIndex = 2;
      this.vividIndexes = [1];
    } else if (condition === 'TRAINING_ED') {
      this.psychoedRoundIndex = 1; // Show training after completing the second round.
    } else if (condition === 'TRAINING_CREATE') {
      this.createScenarioRoundIndex = 2;
    }
    if (testing && condition === 'TRAINING_CREATE') {
      this.state = this.states.CREATE;
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
    console.log("Rounds:")
    console.log(this.rounds)
  }


  loadTraining(study: Study) {
    // Pull the training from the api, split it into a series of rounds
    this.api.getTrainingCSV(study.currentSession.name).subscribe(scenarios => {
      if (scenarios.length !== (this.totalRounds * this.scenariosPerRound)) {
        throw Error('There must be ' +
        (this.totalRounds * this.scenariosPerRound) +
        'scenarios! There are only ' + scenarios.length);
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
      console.log('Progress:', progress);
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

  loadIntro(sessionIndex, condition) {
    this.api.getTrainingIntro(condition).subscribe(sessions => {
      this.sessions = sessions;
      this.currentSession = this.sessions[sessionIndex];
      this.currentSession.startTime = performance.now();
    });
  }

  loadPsyched(study: Study) {
    this.api.getControlInTrainingSessions().subscribe(sessions => {
      this.psychoed = sessions;
      this.psychoedSession = sessions[study.currentSession.index - 1];
    });
  }

  loadCreateScenario() {
    this.api.getCreateScenario().subscribe(sessions => {
      this.createScenario = sessions;
    });
  }

  // loadLemonExercise() {
  //   this.api.getLemonExercise().subscribe(sessions => {
  //     this.lemonExercise = sessions;
  //   });
  // }

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

  loadFlexibleThinking() {
    this.api.getFlexibleThinking().subscribe(sessions => {
      this.flexible_thinking = sessions;
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

  loadPsychoEdFollowup() {
    this.api.getEdFollowup().subscribe(sessions => {
      this.psychoedFollowup = sessions;
    });
  }

  // lemonComplete() {
  //   this.lemonExerciseCompleted = true;
  //   this.state = this.states.IMAGERY;
  // }

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

  flexibleComplete() {
    this.state = this.states.TRAINING;
    this.nextRound();
  }

  psychoedComplete() {
    if (this.state === this.states.PSYCHOED) {
      this.state = this.states.PSYCHOED_FOLLOWUP;
    } else {
      this.state = this.states.TRAINING;
      this.nextRound();
    }
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
      const index = this.scenarioIndex - (this.increment * this.roundIndex) - 2;
      if (index > -2) {
        this.round.index = index;
      }
      this.round.next(correct);
    } else if (this.round.isComplete()) {
      console.log('Round completed.');
      this.round.next(correct);
      this.state = this.states.SUMMARY;
    } else {
      console.log('Next Training Called.  Current score is ${this.round.roundScore()}');
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
    } else if (this.roundIndex === this.flexibleThinkingRoundIndex) {
      this.state = this.states.FLEXIBLE_THINKING;
      this.flexibleThinkingRoundIndex = -1;
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
          const sessionIndex = +(paramMap.get('session') || 1) ;
          const study = {
          name: 'default',
          conditioning: 'TRAINING',
          currentSession: {index: 0, name: 'demo'},
          currentSessionIndex: 0
        };
        //study.currentSessionIndex = +paramMap.get('session') - 1;
        switch (paramMap.get('session')) {
          case('1'):
            study.currentSession.name = 'demo';
            break;
          case('5'):
            study.currentSession.name = 'fifthSession';
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
      }
    }));
  }
}



