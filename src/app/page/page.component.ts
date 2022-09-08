import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {ElementEvent, Page} from '../interfaces';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
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
      state('Intro', style({
        transform: 'translateY(150%) translateX(150%) scale(4)'
      })),
      state('*',   style({
        color: '#000',
        transform: 'scale(1)',
        opacity: 0
      })),
      transition('Intro => *', animate('600ms ease-in')),
      transition('* => Intro', animate('600ms ease-out'))
    ]),
    trigger('imageState', [
      state('Intro', style({
        opacity: 1
      })),
      state('*',   style({
        opacity: 0
      })),
      transition('* => Intro', animate('600ms ease-in')),
      transition('Intro => *', animate('600ms ease-out'))
    ]),
  ]
})
export class PageComponent implements OnChanges {

  @Input()
  isStory = false;

  @Input()
  page: Page;
  elementIndex: number;
  numElements: number;
  correct = true;
  visibleElements = [];
  startTime: number;
  endTime: number;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  @Output()
  update: EventEmitter<ElementEvent> = new EventEmitter();

  @Output()
  event: EventEmitter<ElementEvent> = new EventEmitter();

  constructor() { }

  ngOnChanges() {
    this.startTime = performance.now();
    this.elementIndex = 0;
    this.numElements = this.page.elements.length;
    this.visibleElements = [];
    this.visibleElements.push(this.page.elements[this.elementIndex]);
    console.log('Total Elements', this.numElements);
    this.markStaticComponentsComplete();
  }

  markStaticComponentsComplete() {
    for (const element of this.page.elements) {
      if (['Paragraph', 'References', 'Image', 'LargeHeader', 'Header', 'CenterHeader', 'Link', 'Video'].
      includes(element.type)) {
        this.divCompleted();
      }
    }
  }

  divCompleted(correct= true) {
    console.log('Div Completed:', this.page.elements[this.elementIndex]);
    if (!correct) {
      this.correct = false;
    }
    this.elementIndex++;
    if (this.elementIndex >= this.numElements) {
      this.endTime = performance.now();
      // If we have any update events, submit those
      this.done.emit(correct);
    } else {
      this.visibleElements.push(this.page.elements[this.elementIndex]);
    }
  }

  elementUpdated(event: ElementEvent) {
    this.update.emit(event);
  }

  handleElementEvent(event: ElementEvent) {
    this.event.emit(event);
  }
}
