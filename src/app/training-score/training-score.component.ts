import {Component, Input, OnInit} from '@angular/core';
import {Round} from '../round';

@Component({
  selector: 'app-training-score',
  templateUrl: './training-score.component.html',
  styleUrls: ['./training-score.component.scss']
})
export class TrainingScoreComponent implements OnInit {

  @Input() round: Round;
  ready = false;

  constructor() {}

  ngOnInit() {
    this.ready = true;
  }


}
