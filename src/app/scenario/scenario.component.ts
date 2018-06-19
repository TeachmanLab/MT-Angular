import { Component, OnInit } from '@angular/core';
import {animate, keyframes, query, stagger, state, style, transition, trigger} from '@angular/animations';
import {Scenario} from '../scenario';
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

  states = ['intro', 'statements', 'input', 'question'];
  state_index = 0;
  scenerio_index = 0;
  state = this.states[0];
  scenarios: Scenario[];
  scenario: Scenario;
  constructor() {

    const s1: Scenario = {
      image: 'chicago',
      title: 'Visiting Chicago',
      statement: 'You are visiting Chicago.  While there you decide to purchase a souvenir.  You purhcase a ',
      word: 'postcard',
      question: 'Are you in New York?',
      options: ['Yes', 'No'],
      answer: 'No'
    };

    const s2: Scenario = {
      image: 'shopping',
      title: 'Out Shopping',
      statement: 'You are out shopping with a friend who tends to be very loud. When you both' +
      ' enter an electronics store, other shoppers stop and look at you and your friend. The experience is ',
      word: 'tolerable',
      question: 'Is it OK for people to look at you and your friend while out shopping?',
      options: ['Yes', 'No'],
      answer: 'Yes'
    };

    const s3: Scenario = {
      image: 'party',
      title: 'At a Party',
      statement: 'You meet someone at a party and feel that you got along well. Later, you call and suggest meeting again.' +
      ' The reply you get makes you feel that the person thinks meeting again would be ',
      word: 'enjoyable',
      question: 'The person you met at the party will probably',
      options: ['Say yes if you ask them on a date.', 'Say no if you ask them on a date.'],
      answer: 'Say yes if you ask them on a date.'
    };

    this.scenarios = [s3, s2, s1];
    this.scenario = this.scenarios[this.scenerio_index];
  }

  ngOnInit() {}

  continueButtonVisible() {
    return this.state === 'intro';
  }

  showStatement() {
    return(this.state === 'statements' || this.state === 'input');
  }

  progressState() {
    if (this.state_index < this.states.length - 1) {
      this.state_index++;
    } else {
      this.state_index = 0;
      this.scenerio_index ++;
      this.scenario = this.scenarios[this.scenerio_index];
    }
    this.state = this.states[this.state_index];
    console.log('The state index is ' + this.state_index + '.  The state is ' + this.state);
  }
}
