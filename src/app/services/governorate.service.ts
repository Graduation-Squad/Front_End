import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Governorate, GovernorateDTO, City } from '../models'; // Fix: Import City

@Injectable({
  providedIn: 'root',
})
export class GovernorateService {
  private apiUrl = `${environment.apiUrl}/Governorate`;

  constructor(private http: HttpClient) {}

  getGovernorates(): Observable<Governorate[]> {
    return this.http.get<Governorate[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  createGovernorate(governorate: GovernorateDTO): Observable<void> {
    return this.http.post<void>(this.apiUrl, governorate).pipe(catchError(this.handleError));
  }

  getGovernorate(id: number): Observable<Governorate> {
    return this.http.get<Governorate>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  updateGovernorate(id: number, governorate: GovernorateDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, governorate).pipe(catchError(this.handleError));
  }

  deleteGovernorate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  updateGovernorateStatus(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/status`, null).pipe(catchError(this.handleError));
  }

  getCitiesByGovernorate(id: number): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/${id}/cities`).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('GovernorateService Error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}

export default GovernorateService; // Add this for consistency