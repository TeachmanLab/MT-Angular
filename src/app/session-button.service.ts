import { EventEmitter, Injectable, Output } from '@angular/core';
import { Session } from './interfaces'

@Injectable({
  providedIn: 'root'
})
export class SessionButtonService {

  constructor() { }

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  lastSession: Session;

  setLastSession(lastSession: Session) {
    this.lastSession = lastSession;
  }

  getLastSession() {
    return this.lastSession;
  }



}
