import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BulletList} from '../interfaces';

@Component({
  selector: 'app-bullet-list',
  templateUrl: './bullet-list.component.html',
  styleUrls: ['./bullet-list.component.scss']
})
export class BulletListComponent implements OnInit {

  @Input()
  bulletList: BulletList;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    // No real steps to complete, just let the containing element know that.
    this.bulletList.content = this.bulletList.title + ' ' + this.bulletList.bullets; // for populating pageData
    this.done.emit();
  }

}
