import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl = `${environment.apiUrl}/Report`;

  constructor(private http: HttpClient) {}

  getOrdersReport(params: any): Observable<any> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined) {
        httpParams = httpParams.set(key, params[key].toString());
      }
    });
    return this.http.get<any>(`${this.apiUrl}/orders`, { params: httpParams }).pipe(catchError(this.handleError));
  }

  getDeliveryPerformanceReport(params: any): Observable<any> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined) {
        httpParams = httpParams.set(key, params[key].toString());
      }
    });
    return this.http.get<any>(`${this.apiUrl}/delivery-performance`, { params: httpParams }).pipe(catchError(this.handleError));
  }

  getFinancialReport(params: any): Observable<any> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined) {
        httpParams = httpParams.set(key, params[key].toString());
      }
    });
    return this.http.get<any>(`${this.apiUrl}/financial`, { params: httpParams }).pipe(catchError(this.handleError));
  }

  getMerchantSummaryReport(params: any): Observable<any> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined) {
        httpParams = httpParams.set(key, params[key].toString());
      }
    });
    return this.http.get<any>(`${this.apiUrl}/merchant-summary`, { params: httpParams }).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('ReportService Error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}

export default ReportService; // Add this line to ensure module export