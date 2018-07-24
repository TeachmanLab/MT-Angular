import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Section} from '../interfaces';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  @Input()
  section: Section;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  allDone() {
    this.done.emit();
  }
}
