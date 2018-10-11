import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {PageData, Scenario, Session} from './interfaces';
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

  public getTrainingIntroduction(): Observable<Session[]> {
    return this.httpClient.get<Session[]>('./assets/json/training_intro.json')
      .pipe((catchError(this.handleError)));
  }

  public getTrainingSessionIndicators(): Observable<Session[]> {
    return this.httpClient.get<Session[]>('./assets/json/training_session_indicators.json')
      .pipe((catchError(this.handleError)));
  }

  public getTrainingCSV(session: string): Observable<Scenario[]> {
    const url = './assets/csv/<session>.csv'.replace('<session>', session);
    return this.httpClient.get(url, {responseType: 'text'})
      .pipe((catchError(this.handleError)))
      .pipe(map(n => TrainingCSV.toJson(n)));
  }

  public getSessions(): Observable<any> {
    return this.httpClient.get<Session[]>('./assets/json/sessions.json')
      .pipe((catchError(this.handleError)));
  }

  addResponse(pageData: PageData[]): Observable<PageData[]> {
    return this.httpClient.post<PageData[]>(this.endpoints.response, pageData)
      .pipe(catchError(this.handleError));
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

