import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Session} from 'selenium-webdriver';
import {Scenario} from './interfaces';
import {TrainingCSV} from './training-csv';

@Injectable()
export class ApiService {
  /* This is just a placeholder, presently.  We will eventually use this to connect with MindTrails to load the Joson
  file and report user progress back to MindTrails so it can store information in the databsae.
   */

  // REST endpoints
  endpoints = {
    content: '/api/content',
    response: '/api/response',
    session: '/api/session'
  };

  constructor(private httpClient: HttpClient) {
  }

  public getIntro(): Observable<any> {
    return this.httpClient.get<Session>('./assets/json/intro.json')
      .pipe((catchError(this.handleError)));
  }

  public getTraining(): Observable<any> {
    return this.httpClient.get<Session>('./assets/json/training.json')
      .pipe((catchError(this.handleError)));
  }

  public getTrainingCSV(): Observable<Scenario[]> {
    return this.httpClient.get('./assets/csv/firstSession.csv', {responseType: 'text'})
      .pipe((catchError(this.handleError)))
      .pipe(map(n => TrainingCSV.toJson(n)));
  }


  public getSessions(): Observable<any> {
    return this.httpClient.get<Session[]>('./assets/json/sessions.json')
      .pipe((catchError(this.handleError)));
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'Something bad happened; please try again later.';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned a status code ${error.status}, ` +
        `Code was: ${JSON.stringify(error.error.code)}, ` +
        `Message was: ${JSON.stringify(error.error.message)}`);
      message = error.error.message;
    }
    // return an observable with a user-facing error message
    // FIXME: Log all error messages to Google Analytics
    return throwError(message);
  }
}

