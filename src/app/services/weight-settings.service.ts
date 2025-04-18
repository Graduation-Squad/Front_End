import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { WeightSetting, CreateWeightSetting } from '../models';

@Injectable({
  providedIn: 'root',
})
export class WeightSettingsService {
  private apiUrl = `${environment.apiUrl}/v1/WeightSettings`;

  constructor(private http: HttpClient) {}

  getWeightSettings(): Observable<WeightSetting[]> {
    return this.http.get<WeightSetting[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  createWeightSetting(setting: CreateWeightSetting): Observable<void> {
    return this.http.post<void>(this.apiUrl, setting).pipe(catchError(this.handleError));
  }

  getWeightSetting(id: number): Observable<WeightSetting> {
    return this.http.get<WeightSetting>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  updateWeightSetting(id: number, setting: CreateWeightSetting): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, setting).pipe(catchError(this.handleError));
  }

  deleteWeightSetting(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  calculateWeightCost(params: { weight: number; governorateId: number }): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/calculate`, { params }).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('WeightSettingsService Error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}