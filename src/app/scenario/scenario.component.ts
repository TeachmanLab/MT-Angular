import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, keyframes, query, stagger, state, style, transition, trigger} from '@angular/animations';
import {Scenario} from '../interfaces';
import {interval} from 'rxjs';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss'],
  animations: [
    trigger('flyUpDown', [
      state('in', style({transform: 'translateY(0)'})),
      transition('void => *', [
        animate(600, keyframes([
          style({opacity: 0, transform: 'translateY(100%)', offset: 0}),
          style({opacity: 1, transform: 'translateY(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateY(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateY(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateY(-100%)',  offset: 1.0})
        ]))
      ])
    ]),
    trigger('titleState', [
      state('intro', style({
        transform: 'translateY(150%) translateX(150%) scale(4)'
      })),
      state('*',   style({
        color: '#000',
        transform: 'scale(1)'
      })),
      transition('intro => *', animate('600ms ease-in')),
      transition('* => intro', animate('600ms ease-out'))
    ]),
    trigger('imageState', [
      state('intro', style({
        opacity: 1
      })),
      state('*',   style({
        opacity: 0
      })),
      transition('* => intro', animate('600ms ease-in')),
      transition('intro => *', animate('600ms ease-out'))
    ]),
  ]
})
export class ScenarioComponent implements OnInit {

  @Input()
  scenario: Scenario;
  states = ['intro', 'statements']
  state_index = 0;
  state = this.states[0];

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    if (this.scenario.missingLetter) {
      this.states[this.states.length] = 'input';
    }
    if (this.scenario.question) {
      this.states[this.states.length] = 'question';
    }
  }

  continueButtonVisible() {
    return this.state === 'intro';
  }

  showStatement() {
    return(this.state === 'statements' || this.state === 'input');
  }

  progressState() {
    if (this.state_index < this.states.length - 1) {
      this.state_index++;
      this.state = this.states[this.state_index];
      console.log('The state index is ' + this.state_index + '.  The state is ' + this.state);
    } else {
      this.state_index = 0;
      this.state = this.states[this.state_index];
      console.log('The scenario is complete.' + this.state_index + '.  The state is ' + this.state);
      this.done.emit();
    }
  }
}
