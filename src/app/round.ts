import {Scenario} from './interfaces';

export class Round {
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

  /** Provides a floating point number between 0 and 1, of the score of a scenario.
   *
   * @param {Scenario} scenario
   * @returns {number}
   */
  scenarioScore(scenario: Scenario) {
    if (scenario.numAnswer === 4) {
      if (scenario.numCorrect === 1) {
        scenario.score = 0.25;
      } else if (scenario.numCorrect === 2) {
        scenario.score = 0.5;
      } else if (scenario.numCorrect === 3) {
        scenario.score = 1;
      }
    } else {
      scenario.score = (scenario.numCorrect) * 0.5;
    }
    return  scenario.score;
  }

  roundScore() {
    let score = 0;
    for (const s of this.scenarios) {
      score += this.scenarioScore(s);
    }
    return score;
  }

}
