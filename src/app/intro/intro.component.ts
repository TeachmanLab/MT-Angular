import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Intro, Div} from '../interfaces';
import { QuestionService } from '../question.service';


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
    this.divsComplete = false;
    // this.nextDiv();

  }

  updateDivIndex() {
    this.divIndex += 1;
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
    this.done.emit();
  }

}
