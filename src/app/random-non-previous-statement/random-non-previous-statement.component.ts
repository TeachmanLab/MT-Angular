import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BulletList, ElementEvent, RandomNonPreviousStatement} from '../interfaces';
import {ApiService} from '../api.service';
import {ActivatedRoute} from '@angular/router';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-random-non-previous-statement',
  templateUrl: './random-non-previous-statement.component.html',
  styleUrls: ['./random-non-previous-statement.component.css']
})
export class RandomNonPreviousStatementComponent implements OnInit {
  /**
   * Displays a random statement from a set of options.  If possible, checks the
   * api to see if this statement was displayed previously, and if so, will not
   * select it.
   */

  statement = '';
  startTime: number;
  endTime: number;
  ready = false;

  @Input()
  randomStatement: RandomNonPreviousStatement;

  @Output()
  done: EventEmitter<any> = new EventEmitter();

  @Output()
  updated: EventEmitter<ElementEvent> = new EventEmitter();

  constructor(
    private api: ApiService,
  ) {}

  ngOnInit() {
    this.startTime = performance.now();
    this.determineStatement();
  }

  determineStatement() {
    // Selects a random statement that does not already exist from a previous
    // recording of this component.
    const previousStatements = [];
    this.api.getAllScenariosByType(this.randomStatement.type).pipe(
      finalize(() => {
         // Do all of this regardless, after everything below is complete.
          const index = Math.floor(Math.random() * Math.floor(this.randomStatement.options.length));
          this.statement = this.randomStatement.options[index];
          this.ready = true;
          this.recordStatement();
          this.done.emit();
        }
        ),
    ).subscribe(progress => {
      for (const eventRecord of progress) {
        console.log('event:', eventRecord);
        if (eventRecord.stimulusName === this.randomStatement.stimulusName &&
           eventRecord.trialType === this.randomStatement.type) {
          previousStatements.push(eventRecord.stimulus);
        }
      }
      console.log('Previous Statements:', previousStatements);
      this.randomStatement.options = this.randomStatement.options.filter( function(el) {
        return !previousStatements.includes( el );
      });
    }, error1 => {
      console.log('Backend not responding, not checking previous answers.');
    });
  }


  recordStatement(): void {
    this.endTime = performance.now();
    const event: ElementEvent = {
      trialType: this.randomStatement.type,
      stimulus: this.statement,
      stimulusName: this.randomStatement.stimulusName,
      rtFirstReact: this.endTime - this.startTime,
      rt: this.endTime - this.startTime
    };
    this.updated.emit(event);
  }

}
