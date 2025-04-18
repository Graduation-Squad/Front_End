import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginModel, RegisterRequest, RegisterResponse, ChangePasswordModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiUrl = `${environment.apiUrl}/Account`;

  constructor(private http: HttpClient) {}

  register(model: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, model).pipe(
      catchError(this.handleError)
    );
  }

  login(model: LoginModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, model).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role || 'User');
        }
      }),
      catchError(this.handleError)
    );
  }

  changePassword(model: ChangePasswordModel): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/change-password`, model).pipe(
      catchError(this.handleError)
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, null).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('AccountService Error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}