import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { OrderDto, OrderCreateDto, OrderUpdateDto, OrderStatusUpdateDto } from '../models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/Order`;

  constructor(private http: HttpClient) {}

  getOrders(params: {
    merchantId?: number;
    deliveryAgentId?: number;
    branchId?: number;
    areaId?: number;
    cityId?: number;
    governorateId?: number;
    status?: string;
    paymentMethodId?: number;
    shippingTypeId?: number;
    sortBy?: string;
    isSortAscending?: boolean;
    pageNumber?: number;
    pageSize?: number;
  }): Observable<OrderDto[]> {
    let httpParams = new HttpParams();
    // Fix: Use type assertion to avoid index signature issue
    const paramEntries = Object.entries(params) as [string, string | number | boolean | undefined][];
    paramEntries.forEach(([key, value]) => {
      if (value !== undefined) {
        httpParams = httpParams.set(key, value.toString());
      }
    });
    return this.http.get<OrderDto[]>(this.apiUrl, { params: httpParams }).pipe(catchError(this.handleError));
  }

  createOrder(order: OrderCreateDto): Observable<OrderDto> {
    return this.http.post<OrderDto>(this.apiUrl, order).pipe(catchError(this.handleError));
  }

  getOrder(id: number): Observable<OrderDto> {
    return this.http.get<OrderDto>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  updateOrder(id: number, order: OrderUpdateDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, order).pipe(catchError(this.handleError));
  }

  updateOrderStatus(id: number, statusUpdate: OrderStatusUpdateDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/status`, statusUpdate).pipe(catchError(this.handleError));
  }

  assignDeliveryMan(id: number, deliveryManId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/assign`, null, {
      params: { deliveryManId },
    }).pipe(catchError(this.handleError));
  }

  getMerchantOrders(id: number, params: any): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${this.apiUrl}/merchant/${id}`, { params }).pipe(catchError(this.handleError));
  }

  getAgentOrders(id: number, params: any): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${this.apiUrl}/agent/${id}`, { params }).pipe(catchError(this.handleError));
  }

  getMyOrders(params: any): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${this.apiUrl}/my-orders`, { params }).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('OrderService Error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}

export default OrderService; // Add this for consistency