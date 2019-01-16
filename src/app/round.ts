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
    return Math.round((scenario.numCorrect / scenario.pages.length) * 10) / 10;
  }

  roundScore() {
    let score = 0;
    for (const s of this.scenarios) {
      score += this.scenarioScore(s);
    }
    return score;
  }

}
