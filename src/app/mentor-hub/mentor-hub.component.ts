import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Scenario, Session, Study} from '../interfaces';
import {Round} from '../round';
import {forkJoin} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

enum States {
  'summary', 'email', 'imagery_prime', 'intro', 'training', 'final_summary', 'flexible_thinking', 'wrap_up'}
/**
1) Welcome/email entry/18+ verification
2) Use your imagination exercise (page 21 of the R01/TET appendix, attached)
3) [randomized set of 40 training scenarios w/ progress bar?] - not sure how these are broken up, but whatever the current organization is works!
4) Quick thinking (page 31)
5) Wrap up page (thanks for practicing, etc.)
*/

@Component({
  selector: 'app-mentor-hub',
  templateUrl: './mentor-hub.component.html',
  styleUrls: ['./mentor-hub.component.scss']
})
export class MentorHubComponent implements OnInit {

  current_state = States.intro;
  states = States;
  imageryPrime: Session[];
  flexibleThinking: Session[];
  intro: Session;
  trainingScenarios: Scenario[];

  totalRounds = 4;
  scenariosPerRound = 10;
  totalScore = 0;
  scenarioIndex = 0;
  roundIndex = 0;
  round: Round;
  rounds: Round[];
  pageCount: number;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) {

    this.route.queryParamMap.subscribe(queryParamMap => {
      if (queryParamMap.get('testing') === 'true' || false) {
        this.totalRounds = 2;
        this.scenariosPerRound = 3;
      }
    });

  }



  ngOnInit() {
    this.api.getImageryPrime().subscribe(sessions => {
      this.imageryPrime = sessions;
    });
    this.api.getFlexibleThinking().subscribe(sessions => {
      this.flexibleThinking = sessions;
    });
    this.api.getTrainingIntro('n/a').subscribe(sessions => {
      this.intro = sessions.find(e => e.session === 'mentorHub');
    });

      this.getRandomScenarios();
  }

  getRandomScenarios() {
    // Grab ALL of the scenarios, and join them together, then randomly
    // select a set to run the study.
    const s1 = this.api.getTrainingCSV('firstSession');
    const s2 = this.api.getTrainingCSV('secondSession');
    const s3 = this.api.getTrainingCSV('thirdSession');
    const s4 = this.api.getTrainingCSV('fourthSession');
    const s5 = this.api.getTrainingCSV('fifthSession');

    const total_count = this.totalRounds * this.scenariosPerRound;
    const from_each = Math.ceil(total_count / 5);
    this.trainingScenarios = [];
    forkJoin([s1, s2, s3, s4, s5]).subscribe( results => {
      // So that things get incrementally harder, grab a random subset from each
      // session, and then join them.
      for (let i = 0; i < 5; i++) {
        this.trainingScenarios = this.trainingScenarios.concat(this.getRandomSubarray(results[i], from_each));
      }
      this.scenariosToRounds(this.trainingScenarios);
    });

  }

  getRandomSubarray(arr, size) {
    /** Borrowed from Stack overflow, grabs a randomized subsection of an array
     */
    const shuffled = arr.slice(0);
    let i = arr.length;
    while (i--) {
      const index = Math.floor((i + 1) * Math.random());
      const temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
  }

  scenariosToRounds(scenarios) {
    let index = 0;
    scenarios = scenarios.slice(0, this.totalRounds * this.scenariosPerRound);
    const increment = Math.floor(scenarios.length / this.totalRounds);
    this.rounds = [];
    let round = new Round();
    for (const scenario of scenarios) {
      if (index % increment === 0) {
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
    this.round.index = 0;
  }

  saveEmail(email: String) {
    console.log('The email is ' + email);
    this.incrementState();
  }

  scenarioComplete(correct) {
    this.scenarioIndex++;
    if (this.round.isComplete()) {
      this.round.next(correct);
      this.current_state = this.states.summary;
    } else {
      this.round.next(correct);
    }
  }

  isComplete() {
    return this.roundIndex >= this.totalRounds - 1;
  }

  nextRound() {
    if (this.isComplete()) {
      for (const r of this.rounds) {
        this.totalScore += r.roundScore();
      }
      this.current_state = this.states.final_summary;
    } else {
      this.current_state = this.states.training;
      this.roundIndex++;
      this.round = this.rounds[this.roundIndex];
      this.round.next();
    }
  }

  incrementState() {
    // This nonsensical code will move us to the next state in the States
    // enumeration.  Sometimes enums just don't make no sense!
    const total_states = Object.keys(States).length / 2;
    if (total_states > this.current_state + 1) {
      this.current_state = States[States[this.current_state + 1]];
    }
  }

  updatePageCount(event) {
    this.pageCount = event; // update the pageCount as the users work through the scenarios
  }


}
