import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DeadlineResponse } from '../models/DeadlineResponse';

@Injectable({
  providedIn: 'root'
})
export class DeadlineService {
  private readonly API_URL = '/api/deadline';

  constructor(private http: HttpClient) {}

  getSecondsLeft(): Observable<number> {
    return this.http.get<DeadlineResponse>(this.API_URL)
      .pipe(
        map(response => response.secondsLeft)
      );
  }
}
