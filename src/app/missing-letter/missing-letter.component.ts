import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LetterTile} from '../letter-tile';
import {animate, query, stagger, state, style, transition, trigger} from '@angular/animations';
import {interval} from 'rxjs';

@Component({
  selector: 'app-missing-letter',
  templateUrl: './missing-letter.component.html',
  styleUrls: ['./missing-letter.component.scss']
})
export class MissingLetterComponent implements OnInit {

  @Input()
  word: string;

  @Output()
  done: EventEmitter<any> = new EventEmitter();


  letters: LetterTile[];
  incorrect_letters: string[];
  correct_letter: string;
  missing_letter_tile: LetterTile;
  options: string[];
  incorrect_choices: string[] = [];
  state = 'waiting';

  constructor() {
  }

  ngOnInit() {
    const missing_index = Math.floor(Math.random() * this.word.length) ;
    this.letters = [];
    let letter = '';
    for (let i = 0; i < this.word.length; i++) {
      letter = this.word.charAt(i).toUpperCase();
      const tile = {letter: letter, status: 'provided'};
      this.letters.push(tile);
      if (i === missing_index) {
        this.correct_letter = letter;
        this.missing_letter_tile = tile;
        this.missing_letter_tile.letter = '';
        this.missing_letter_tile.status = 'missing';
      }
    }
    this.setOptions();
  }

  selectLetter(letter) {
    this.missing_letter_tile.letter = letter;
    if (letter === this.correct_letter) {
      this.state = 'correct';
      this.missing_letter_tile.status = 'correct';
      const waitASectionTimer = interval(1500);
      const sub = waitASectionTimer.subscribe( n => {
        console.log('Waited!');
        this.done.emit();
        sub.unsubscribe();
      });
    } else {
      this.state = 'incorrect';
      this.missing_letter_tile.status = 'incorrect';
      this.incorrect_choices.push(letter);
    }
  }

  isIncorrectChoice(letter) {
    console.log('Incorrect choices: ' + this.incorrect_choices);
    console.log('was this letter incorrect?' + letter + ' --- ' +
      (this.incorrect_choices.indexOf(letter) >= 0)
    );
    return this.incorrect_choices.indexOf(letter) >= 0;
  }

  setOptions() {
    // Calculate a set of 4 possible options for the user to select.
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
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
