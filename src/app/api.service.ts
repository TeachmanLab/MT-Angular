import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {EventRecord, Scenario, Session, Study} from './interfaces';
import {TrainingCSV} from './training-csv';
import {environment} from '../environments/environment';
import {RequestOptions} from '@angular/http';

@Injectable()
export class ApiService {


  // REST endpoints
  endpoints = {
    progress: environment.progress_endpoint,
    study: environment.progress_endpoint + 'study',
    scenarios: environment.progress_endpoint + 'scenarios',
    all_scenarios: environment.progress_endpoint + 'all_scenarios'
  };

  constructor(private httpClient: HttpClient) {
  }

  public getRecognitionRatings(): Observable<any> {
      return this.httpClient.get('./assets/json/recognition_ratings.json')
    .pipe((catchError(this.handleError)));
  }

  public getControlSessions(): Observable<any> {
    return this.httpClient.get<Session[]>('./assets/json/control.json')
      .pipe((catchError(this.handleError)));
  }

  public getControlInTrainingSessions(): Observable<any> {
    return this.httpClient.get<Session[]>('./assets/json/control_in_training.json')
      .pipe((catchError(this.handleError)));
  }

  public getTrainingIntro(condition: String): Observable<Session[]> {
    let url = '';
    if (condition === 'TRAINING_30') {
      url = './assets/json/training30_intro.json';
    } else if (condition === 'TRAINING_ED') {
      url = './assets/json/traininged_intro.json';
    } else {
      url = './assets/json/training_intro.json';
    }
    return this.httpClient.get<Session[]>(url)
      .pipe((catchError(this.handleError)));
  }

  public getCreateScenario(): Observable<Session[]> {
    return this.httpClient.get<Session[]>('./assets/json/create_scenario.json')
      .pipe((catchError(this.handleError)));
  }

  public getLemonExercise(): Observable<Session[]> {
    return this.httpClient.get<Session[]>('./assets/json/lemon.json')
      .pipe((catchError(this.handleError)));
  }

  public getReadinessRulers(): Observable<Session[]> {
    return this.httpClient.get<Session[]>('./assets/json/readiness_rulers.json')
      .pipe((catchError(this.handleError)));
  }

  public getVividness(): Observable<Session[]> {
    return this.httpClient.get<Session[]>('./assets/json/vividness.json')
      .pipe((catchError(this.handleError)));
  }

  public getFlexibleThinking(): Observable<Session[]> {
    return this.httpClient.get<Session[]>('./assets/json/flexible_thinking.json')
      .pipe((catchError(this.handleError)));
  }

  public getEdFollowup(): Observable<Session[]> {
    return this.httpClient.get<Session[]>('./assets/json/psychoed_followup.json')
      .pipe((catchError(this.handleError)));
  }

  public getImageryPrime(): Observable<Session[]> {
    return this.httpClient.get<Session[]>('./assets/json/imagery_prime.json')
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
      .pipe(map(csv => TrainingCSV.toJson(session, csv)));
  }

  saveProgress(pageData: EventRecord[]): Observable<EventRecord[]> {
    return this.httpClient.post<EventRecord[]>(this.endpoints.progress, pageData)
      .pipe(catchError(this.handleError));
  }

  getProgress(): Observable<EventRecord[]> {
    return this.httpClient.get<EventRecord[]>(this.endpoints.progress)
      .pipe(catchError(this.handleError));
  }

  getScenarios(): Observable<EventRecord[]> {
    return this.httpClient.get<EventRecord[]>(this.endpoints.scenarios)
      .pipe(catchError(this.handleError));
  }

  getAllScenariosByType(type: String): Observable<EventRecord[]> {
    return this.httpClient.get<EventRecord[]>(this.endpoints.all_scenarios + '/' + type)
      .pipe(catchError(this.handleError));
  }


  getStudy(): Observable<Study> {
    return this.httpClient.get<Study>(this.endpoints.study)
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

