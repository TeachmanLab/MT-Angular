import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionButtonService {

  constructor() { }

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  onLastSection() {
    this.change.emit(true);
  }



}
