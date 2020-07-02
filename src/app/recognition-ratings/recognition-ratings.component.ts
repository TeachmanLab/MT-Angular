import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ApiService } from '../api.service';
import {Page, Scenario, Session, Step, Study} from '../interfaces';
// import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import {Round} from '../round';
// import {catchError, map, withLatestFrom} from 'rxjs/operators';
import {combineLatest, observable, Observable} from 'rxjs';
import {withLatestFrom} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

enum State {
  'INTRO', 'RR'
}

@Component({
  selector: 'app-recognition-ratings',
  templateUrl: './recognition-ratings.component.html',
  styleUrls: ['./recognition-ratings.component.scss']
})
export class RecognitionRatingsComponent implements OnInit {

  title = 'Recognition Ratings';
  state = State.INTRO;
  states = State;
  sessions: Session[];
  sessionIndex = 0;
  stepIndex = 0;
  currentSession: Session;

  scenarios: Scenario[];
  currentScenario: Scenario;
  // indicatorSessions: Session[];
  // totalRounds = 4;
  // scenariosPerRound = 10;
  // totalScore = 0;
  // roundIndex = 0;
  round: Round;
  rounds: Round[];  // Training is broken up into a series of rounds.
  scenarioIndex = 0;
  pageCount: number;
  increment: number;

  @Output() done: EventEmitter<any> = new EventEmitter();


  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('recognitionRatings',
      sanitizer.bypassSecurityTrustResourceUrl('assets/training_images/example_icons/recognitionRatings.svg'));
  }


  ngOnInit() {
    this.loadIntro();
    this.loadTraining();
  }

  loadIntro() {
    this.api.getRecognitionRatings().subscribe(sessions => {
      this.sessions = sessions;
      this.currentSession = this.sessions[0];
      this.currentSession.startTime = performance.now();
    });
  }

  introComplete() {
    this.state = State.RR;
    this.currentSession = {
      session: 'Recognition Ratings',
      title: 'Recognition Ratings',
      subTitle: '',
      sessionIndicator: 'recognitionRatings',
      description: [],
      steps: [],
      conditioning: '',
      study: null
    };
  }

  loadTraining() {
    this.api.getTrainingCSV('recognitionRatings').subscribe(scenarios => {
      this.scenarios = scenarios;

      // Drop the first page containing the title, and make it a header for the subsequent
      for (const s of scenarios) {
        const title: Page = s.pages[0];
        s.pages.shift(); // Drop the title page.
        s.pages[0].elements.unshift({type: 'Header', content: title.elements[0].content});
        console.log(s);
      }
      this.currentScenario = this.scenarios[0];
    });
  }

  scenarioComplete($event) {
    this.scenarioIndex++;
    this.currentScenario = this.scenarios[this.scenarioIndex];
    if (this.scenarioIndex >= this.scenarios.length) {
      window.location.href = environment.redirect;
    }
  }

  updatePageCount(event) {
    this.pageCount = event; // update the pageCount as the users work through the scenarios
  }


}
