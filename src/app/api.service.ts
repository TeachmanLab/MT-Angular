import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {EventRecord, Scenario, Session, Study} from './interfaces';
import {TrainingCSV} from './training-csv';
import {environment} from '../environments/environment';

@Injectable()
export class ApiService {


  // REST endpoints
  endpoints = {
    progress: environment.progress_endpoint,
    study: environment.progress_endpoint + 'study',
    scenarios: environment.progress_endpoint + 'scenarios',
    all_scenarios: environment.progress_endpoint + 'all_scenarios'
  };

  constructor(private httpClient: HttpClient,
              @Inject(LOCALE_ID) public locale: string) {
  }

  private getJsonFile(fileName: String): Observable<any> {
    return this.httpClient.get<Session[]>(`./assets/json/${this.locale}/${fileName}`)
      .pipe((catchError(this.handleError)));
  }

  public getRecognitionRatings(): Observable<any> {
    return this.getJsonFile('recognition_ratings.json');
  }

  public getControlSessions(): Observable<any> {
    return this.getJsonFile('control.json');
  }

  public getControlInTrainingSessions(): Observable<any> {
    return this.getJsonFile('control_in_training.json');
  }

  public getTrainingIntro(condition: String): Observable<Session[]> {
    let file = '';
    if (condition === 'TRAINING_30') {
      file = 'training30_intro.json';
    } else if (condition === 'TRAINING_ED') {
      file = 'traininged_intro.json';
    } else {
      file = 'training_intro.json';
    }
    return this.getJsonFile(file);
  }

  public getCreateScenario(): Observable<Session[]> {
    return this.getJsonFile('create_scenario.json');
  }

  public getLemonExercise(): Observable<Session[]> {
    return this.getJsonFile('lemon.json');
  }

  public getReadinessRulers(): Observable<Session[]> {
    return this.getJsonFile('readiness_rulers.json');
  }

  public getVividness(): Observable<Session[]> {
    return this.getJsonFile('vividness.json');
  }

  public getFlexibleThinking(): Observable<Session[]> {
    return this.getJsonFile('flexible_thinking.json');
  }

  public getEdFollowup(): Observable<Session[]> {
    return this.getJsonFile('psychoed_followup.json');
  }

  public getImageryPrime(): Observable<Session[]> {
    return this.getJsonFile('imagery_prime.json');
  }

  public getTrainingSessionIndicators(): Observable<Session[]> {
    return this.getJsonFile('training_session_indicators.json');
  }

  public getTrainingCSV(session: string): Observable<Scenario[]> {
    const url = `./assets/csv/${this.locale}/${session}.csv`;
    console.log(`Loading session from ${url}`);
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

