import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LetterTile} from '../letter-tile';
import {animate, query, stagger, state, style, transition, trigger} from '@angular/animations';
import {interval} from 'rxjs';
import {ElementEvent, MissingLetter} from '../interfaces';

@Component({
  selector: 'app-missing-letter',
  templateUrl: './missing-letter.component.html',
  styleUrls: ['./missing-letter.component.scss']
})
export class MissingLetterComponent implements OnInit {

  @Input()
  missingLetter: MissingLetter;
  word: string;
  startTime: number;
  firstReactionTime: number;
  endTime: number;


  @Output()
  done: EventEmitter<boolean> = new EventEmitter();

  @Output()
  event: EventEmitter<ElementEvent> = new EventEmitter();


  letters: LetterTile[];
  correct_letter: string;
  missing_letter_tile: LetterTile;
  options: string[];
  incorrect_choices: string[] = [];
  choices: string[] = [];
  state = 'waiting';

  constructor() {
  }

  ngOnInit() {
    this.word = this.missingLetter.content.toString();
    let missing_index = Math.floor(Math.random() * this.word.length) ;
    while (this.word.charAt(missing_index) === ' ') {
      missing_index = Math.floor(Math.random() * this.word.length) ;
    }
    this.letters = [];
    let letter = '';
    for (let i = 0; i < this.word.length; i++) {
      letter = this.word.charAt(i).toUpperCase();
      const tile = {letter: letter, status: 'provided'};
      if (letter === ' ') {
        tile.status = 'blank';
      }
      this.letters.push(tile);
      if (i === missing_index) {
        this.correct_letter = letter;
        this.missing_letter_tile = tile;
        this.missing_letter_tile.letter = '';
        this.missing_letter_tile.status = 'missing';
      }
    }
    this.setOptions();
    this.startTime = performance.now();
  }

  selectLetter(letter) {
    const curTime = performance.now();
    if (!this.firstReactionTime) {
      this.firstReactionTime = curTime;
    }
    this.choices.push(letter);
    this.missing_letter_tile.letter = letter;
    if (letter === this.correct_letter) {
      this.endTime = curTime;
      this.state = 'correct';
      this.missing_letter_tile.status = 'correct';
      this.incorrect_choices = []; // reset incorrect choices - Added by Anna
      const waitASectionTimer = interval(1500);
      const sub = waitASectionTimer.subscribe( n => {
        this.allDone();
        sub.unsubscribe();
      });
    } else {
      this.state = 'incorrect';
      this.missing_letter_tile.status = 'incorrect';
      this.incorrect_choices.push(letter);

    }
  }

  allDone() {
    const event: ElementEvent = {
      trialType: this.missingLetter.type,
      stimulus: this.word,
      stimulusName: this.missingLetter.stimulusName,
      buttonPressed: this.choices.join(','),
      correct: this.choices.length === 1,
      rtFirstReact: this.firstReactionTime - this.startTime,
      rt: this.endTime - this.startTime
    };
    this.event.emit(event);
    this.done.emit(this.choices.length === 1);
  }


  isIncorrectChoice(letter) {
    return this.incorrect_choices.indexOf(letter) >= 0;
  }

  setOptions() {
    // Calculate a set of 4 possible options for the user to select.
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.replace(this.correct_letter, '');
    const rand_index = Math.floor(Math.random() * 4);
    this.options = [];
    for (let i = 0; i < 4;) {
      const letter = possible.charAt(Math.floor(Math.random() * possible.length));
      if (this.options.indexOf(letter) === -1) {
        this.options.push(letter);
        i++;
      }
    }
    this.options[rand_index] = this.correct_letter;
  }

}
