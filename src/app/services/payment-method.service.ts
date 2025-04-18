import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { PaymentMethod, PaymentMethodDto } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodService {
  private apiUrl = `${environment.apiUrl}/PaymentMethod`;

  constructor(private http: HttpClient) {}

  getPaymentMethods(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  createPaymentMethod(method: PaymentMethodDto): Observable<void> {
    return this.http.post<void>(this.apiUrl, method).pipe(catchError(this.handleError));
  }

  getPaymentMethod(id: number): Observable<PaymentMethod> {
    return this.http.get<PaymentMethod>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  updatePaymentMethod(id: number, method: PaymentMethodDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, method).pipe(catchError(this.handleError));
  }

  deletePaymentMethod(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  togglePaymentMethod(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/toggle`, null).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('PaymentMethodService Error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}