import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ApiService } from '../api.service';
import {Scenario, Study} from '../interfaces';
// import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import {Round} from '../round';
// import {catchError, map, withLatestFrom} from 'rxjs/operators';
import {combineLatest, observable, Observable} from 'rxjs';
import {withLatestFrom} from 'rxjs/operators';


@Component({
  selector: 'app-recognition-ratings',
  templateUrl: './recognition-ratings.component.html',
  styleUrls: ['./recognition-ratings.component.scss']
})

export class RecognitionRatingsComponent implements OnInit {

  title = 'Recognition Ratings';

  // sessions: Session[];
  // lemonExercise: Session[] = [];
  // lemonExerciseCompleted = false;
  // readinessRulers: Session[] = [];
  // vividness: Session[] = [];
  // vividIndexes = [1, 2, 20, 40];
  // psychoed: Session[] = [];
  // psychoedFollowup: Session[] = [];
  // psychoedSession: Session;
  // psychoedRoundIndex = -1; // The (0 based) index of the round that should be followed by psycho-education. -1 for none.
  // createScenario: Session[] = [];
  // createScenarioRoundIndex = -1; // The (0 based) index of the round that should be followed by psycho-education. -1 for none.
  // imageryPrime: Session[] = [];
  // flexible_thinking: Session[] = [];
  // flexibleThinkingRoundIndex = -1; // The (0 based) index of the round that should be followed by flex thinking. -1 for none.
  // readinessCompleted = false;
  // imageryPrimeCompleted = false;
  // sessionIndex = 0;
  stepIndex = 0;
  // currentSession: Session;
  // indicatorSessions: Session[];
  // totalRounds = 4;
  // scenariosPerRound = 10;
  // totalScore = 0;
  // roundIndex = 0;
  round: Round;
  rounds: Round[];  // Training is broken up into a series of rounds.
  scenarioIndex = 1;
  pageCount: number;
  increment: number;


  @Input() setScenarioIndex: number;

  @Output() done: EventEmitter<any> = new EventEmitter();


  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) {
  }


  ngOnInit() {
    this.api.getRecognitionRatings().subscribe;

    // Pull the training from the api, split it into a series of rounds
    this.api.getTrainingCSV(study.recognitionRatings).subscribe(scenarios => {
      if (scenarios.length !== 10) {
        throw Error('There must be 10 scenarios! There are only ' + scenarios.length);
      }
    });
  }
}
