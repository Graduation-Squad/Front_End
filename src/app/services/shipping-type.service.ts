import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ShippingType, ShippingTypeDto } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ShippingTypeService {
  private apiUrl = `${environment.apiUrl}/ShippingType`;

  constructor(private http: HttpClient) {}

  getShippingTypes(): Observable<ShippingType[]> {
    return this.http.get<ShippingType[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  createShippingType(type: ShippingTypeDto): Observable<void> {
    return this.http.post<void>(this.apiUrl, type).pipe(catchError(this.handleError));
  }

  getShippingType(id: number): Observable<ShippingType> {
    return this.http.get<ShippingType>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  updateShippingType(id: number, type: ShippingTypeDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, type).pipe(catchError(this.handleError));
  }

  deleteShippingType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  toggleShippingTypeStatus(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/toggle-status`, null).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('ShippingTypeService Error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}