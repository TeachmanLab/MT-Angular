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

  percentCorrect() {
    const errorCount = this.scenarios.filter(s => s.status === 'error').length;
    return (this.scenarios.length - errorCount) / this.scenarios.length;
  }

  numCorrect() {
    return this.scenarios.filter(s => s.status === 'complete').length;
  }


}
