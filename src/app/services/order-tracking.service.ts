import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { OrderTracking, CreateOrderTrackingDto } from '../models';

@Injectable({
  providedIn: 'root',
})
export class OrderTrackingService {
  private apiUrl = `${environment.apiUrl}/v1/orders`;

  constructor(private http: HttpClient) {}

  getOrderTracking(orderId: number): Observable<OrderTracking[]> {
    return this.http.get<OrderTracking[]>(`${this.apiUrl}/${orderId}/tracking`).pipe(catchError(this.handleError));
  }

  createOrderTracking(orderId: number, tracking: CreateOrderTrackingDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${orderId}/tracking`, tracking).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('OrderTrackingService Error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}