import {Component, Input, OnInit} from '@angular/core';
import {Session} from '../interfaces';
import {ApiService} from '../api.service';
import {Round} from '../round';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-final-score-testview',
  templateUrl: './final-score-testview.component.html',
  styleUrls: ['./final-score-testview.component.scss']
})
export class FinalScoreTestviewComponent implements OnInit {

  numScenarios = 10;
  numCorrect = [2, 8, 10, 4];
  totalRounds = 4;
  rounds: Round[];
  session: Session;
  ready = false;
  totalScore: number;

  constructor(private api: ApiService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadSession2();
  }

  setCorrectCount(event: any, index: number) { // without type info
    this.numCorrect[index] = Number(event.target.value);
    this.createTestRounds();
  }

  setTotalRounds(event: any) { // without type info
    this.totalRounds = Number(event.target.value);
    this.createTestRounds();
  }

  loadSession2() {
    this.api.getTrainingIntro("training").subscribe(s => {
        this.session = s[1];
        this.createTestRounds();
      }
    );
  }

  createTestRounds() {
    // Pull the training from the api, split it into a series of rounds
    this.rounds = [];
    this.totalScore = 0;
    this.api.getTrainingCSV('firstSession').subscribe(scenarios => {
        for (let i = 0; i < this.totalRounds; i++) {
          const round = new Round();
          round.scenarios = scenarios.slice(i * this.numScenarios, this.numScenarios * (i + 1));
          // mark the rounds as complete with the given number of correct answers.
          let count = 0;
          while (count < this.numScenarios) {
             if (count <= this.numCorrect[i]) {
                round.scenarios[count].score = 1;
              }
            round.next(true);
            count++;
          }
          this.rounds.push(round);
          this.totalScore += round.roundScore();
        }
      });
    this.ready = true;
  }
}
