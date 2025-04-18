import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { City, CityDTO } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private apiUrl = `${environment.apiUrl}/City`;

  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  createCity(city: CityDTO): Observable<void> {
    return this.http.post<void>(this.apiUrl, city).pipe(catchError(this.handleError));
  }

  getCity(id: number): Observable<City> {
    return this.http.get<City>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  updateCity(id: number, city: CityDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, city).pipe(catchError(this.handleError));
  }

  deleteCity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  updateCityStatus(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/status`, null).pipe(catchError(this.handleError));
  }

  getCitiesByGovernorate(governorateId: number): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/by-governorate/${governorateId}`).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('CityService Error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}