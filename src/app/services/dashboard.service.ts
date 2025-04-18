import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AdminDashboardDto, MerchantDashboardDto, EmployeeDashboardDto } from '../models';

@Injectable({
  providedIn: 'root', // This ensures the service is injectable
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/Dashboard`;

  constructor(private http: HttpClient) {}

  getMerchantDashboard(): Observable<MerchantDashboardDto> {
    return this.http.get<MerchantDashboardDto>(`${this.apiUrl}/merchant`).pipe(catchError(this.handleError));
  }

  getEmployeeDashboard(): Observable<EmployeeDashboardDto> {
    return this.http.get<EmployeeDashboardDto>(`${this.apiUrl}/employee`).pipe(catchError(this.handleError));
  }

  getAdminDashboard(): Observable<AdminDashboardDto> {
    return this.http.get<AdminDashboardDto>(`${this.apiUrl}/admin`).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('DashboardService Error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}