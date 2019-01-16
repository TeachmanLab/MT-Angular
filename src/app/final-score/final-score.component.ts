import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Session} from '../interfaces';
import {Round} from '../round';

@Component({
  selector: 'app-final-score',
  templateUrl: './final-score.component.html',
  styleUrls: ['./final-score.component.scss']
})
export class FinalScoreComponent implements OnInit {

  @Input()
  rounds: Round[];

  @Input()
  session: Session;

  @Input()
  totalScore: number;

  constructor() { }

  ngOnInit() {
  }


  ready() {
    return (this.session != null && this.rounds != null);
  }


}
