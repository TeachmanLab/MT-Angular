import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Location, LocationStrategy } from '@angular/common';

export interface MentorHubResponse {
  success: boolean;
  response: any;
}

@Injectable()
export class MentorHubService {

  constructor(private httpClient: HttpClient) {
  }

  recordEmail(email: string): Observable<MentorHubResponse> {
    const url = location.origin + location.pathname + 'email';
    return this.httpClient.post<MentorHubResponse>(url, email);
  }

}

