import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { RejectionReason } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RejectionReasonService {
  private apiUrl = `${environment.apiUrl}/RejectionReason`;

  constructor(private http: HttpClient) {}

  getRejectionReasons(): Observable<RejectionReason[]> {
    return this.http.get<RejectionReason[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  createRejectionReason(reason: RejectionReason): Observable<void> {
    return this.http.post<void>(this.apiUrl, reason).pipe(catchError(this.handleError));
  }

  getRejectionReason(id: number): Observable<RejectionReason> {
    return this.http.get<RejectionReason>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  updateRejectionReason(id: number, reason: RejectionReason): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, reason).pipe(catchError(this.handleError));
  }

  deleteRejectionReason(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  toggleRejectionReason(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/toggle`, null).pipe(catchError(this.handleError));
  }

  getRejectionReasonsByType(type: string): Observable<RejectionReason[]> {
    return this.http.get<RejectionReason[]>(`${this.apiUrl}/type/${type}`).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('RejectionReasonService Error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}