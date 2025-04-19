// src/app/services/admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import * as Models from '../models';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  createMerchant(dto: Models.CreateMerchantDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/merchants`, dto).pipe(
      catchError((error) => {
        console.error('Error creating merchant:', error);
        return throwError(() => new Error('Failed to create merchant'));
      })
    );
  }

  createDeliveryMan(dto: Models.CreateDeliveryManDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/delivery-men`, dto).pipe(
      catchError((error) => {
        console.error('Error creating delivery man:', error);
        return throwError(() => new Error('Failed to create delivery man'));
      })
    );
  }

  createEmployee(dto: Models.CreateEmployeeDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/employees`, dto).pipe(
      catchError((error) => {
        console.error('Error creating employee:', error);
        return throwError(() => new Error('Failed to create employee'));
      })
    );
  }

  getAllUsers(): Observable<Models.AppUser[]> {
    return this.http.get<Models.AppUser[]>(`${this.apiUrl}/users`).pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return throwError(() => new Error('Failed to fetch users'));
      })
    );
  }

  updateUserRole(userName: string | null, userType: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userName}/role`, { userType }).pipe(
      catchError((error) => {
        console.error('Error updating user role:', error);
        return throwError(() => new Error('Failed to update user role'));
      })
    );
  }

  getAllOrders(): Observable<Models.OrderDto[]> {
    return this.http.get<Models.OrderDto[]>(`${this.apiUrl}/orders`).pipe(
      catchError((error) => {
        console.error('Error fetching orders:', error);
        return throwError(() => new Error('Failed to fetch orders'));
      })
    );
  }

  getAllAreas(): Observable<Models.Area[]> {
    return this.http.get<Models.Area[]>(`${this.apiUrl}/areas`).pipe(
      catchError((error) => {
        console.error('Error fetching areas:', error);
        return throwError(() => new Error('Failed to fetch areas'));
      })
    );
  }

  getAllPaymentMethods(): Observable<Models.PaymentMethod[]> {
    return this.http.get<Models.PaymentMethod[]>(`${this.apiUrl}/payment-methods`).pipe(
      catchError((error) => {
        console.error('Error fetching payment methods:', error);
        return throwError(() => new Error('Failed to fetch payment methods'));
      })
    );
  }

  getAllPermissions(): Observable<Models.Permission[]> {
    return this.http.get<Models.Permission[]>(`${this.apiUrl}/permissions`).pipe(
      catchError((error) => {
        console.error('Error fetching permissions:', error);
        return throwError(() => new Error('Failed to fetch permissions'));
      })
    );
  }

  getAllRejectionReasons(): Observable<Models.RejectionReason[]> {
    return this.http.get<Models.RejectionReason[]>(`${this.apiUrl}/rejection-reasons`).pipe(
      catchError((error) => {
        console.error('Error fetching rejection reasons:', error);
        return throwError(() => new Error('Failed to fetch rejection reasons'));
      })
    );
  }

  getAllShippingTypes(): Observable<Models.ShippingType[]> {
    return this.http.get<Models.ShippingType[]>(`${this.apiUrl}/shipping-types`).pipe(
      catchError((error) => {
        console.error('Error fetching shipping types:', error);
        return throwError(() => new Error('Failed to fetch shipping types'));
      })
    );
  }

  getAllUserGroups(): Observable<Models.UserGroup[]> {
    return this.http.get<Models.UserGroup[]>(`${this.apiUrl}/user-groups`).pipe(
      catchError((error) => {
        console.error('Error fetching user groups:', error);
        return throwError(() => new Error('Failed to fetch user groups'));
      })
    );
  }

  getAllWeightSettings(): Observable<Models.WeightSetting[]> {
    return this.http.get<Models.WeightSetting[]>(`${this.apiUrl}/weight-settings`).pipe(
      catchError((error) => {
        console.error('Error fetching weight settings:', error);
        return throwError(() => new Error('Failed to fetch weight settings'));
      })
    );
  }
}