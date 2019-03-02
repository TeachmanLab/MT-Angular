import {Scenario} from './interfaces';

export class Round {
  scenarios: Scenario[] = [];
  index = -1;

  constructor() {}

  isComplete(): boolean {
    return (this.index >= this.scenarios.length - 1);
  }

  add(scenario: Scenario) {
    this.scenarios.push(scenario);
  }

  getScenario() {
    return this.scenarios[this.index];
  }

  next(correct = true) {
    if (this.getScenario()) {
      const scenario = this.getScenario();
      scenario.score = this.scenarioScore(scenario);
      scenario.status = scenario.score >= 1 ? 'complete' : 'error';
    }
    this.index++;
    if (this.index < this.scenarios.length) {
      this.getScenario().status = 'active';
    }
  }

  /** Provides a floating point number between 0 and 1, of the score of a scenario.
   *
   * @param {Scenario} scenario
   * @returns {number}
   */
  scenarioScore(scenario: Scenario) {
    if (scenario.numAnswer >= 3) {
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
      score += s.score;
    }
    return score;
  }

}
