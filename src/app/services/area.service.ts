import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Area, AreaDTO } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private apiUrl = `${environment.apiUrl}/Area`;

  constructor(private http: HttpClient) {}

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  createArea(area: AreaDTO): Observable<void> {
    return this.http.post<void>(this.apiUrl, area).pipe(
      catchError(this.handleError)
    );
  }

  getArea(id: number): Observable<Area> {
    return this.http.get<Area>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateArea(id: number, area: AreaDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, area).pipe(
      catchError(this.handleError)
    );
  }

  deleteArea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getAreasByCity(cityId: number): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.apiUrl}/by-city/${cityId}`).pipe(
      catchError(this.handleError)
    );
  }

  updateAreaStatus(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/status`, null).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('AreaService Error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}