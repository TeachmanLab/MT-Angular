import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Intro, Div} from '../interfaces';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: [
    './intro.component.scss',
  ],
})
export class IntroComponent implements OnInit {

  @Input()
  intro: Intro;
  div: Div;
  divIndex: number;
  numDivs: number;
  divsComplete: boolean;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.divIndex = 0;
    this.numDivs = this.intro.introBody.length;

  }

  updateDivIndex() {
    console.log('Completed div ' + this.divIndex + ' of ' + this.numDivs);
    this.divIndex++;
    if (this.divIndex == this.numDivs) {
      this.allDone();
    }
  }

  // nextDiv() {
  //   this.divIndex++;
  //   if (this.divIndex < this.numDivs) {
  //     this.div = this.intro.introBody[this.divIndex];
  //     console.log(this.div);
  //   } else {
  //     this.divsComplete = true;
  //     this.allDone();
  //   }
  // }

  allDone() {
    console.log('Completed Intro')
    this.done.emit();
  }

}
