import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, SimpleChanges } from '@angular/core';
import { Highlight } from '../interfaces'

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit {

  @Input()
  highlight: Highlight;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.highlight.content = this.highlight.title + ' ' + this.highlight.highlight; // for populating pageData
    this.allDone();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.highlight.isFirstChange()) {
      this.highlight = changes.highlight.currentValue;
      this.allDone();
    }
  }

  allDone() {
    this.done.emit();
  }

}
