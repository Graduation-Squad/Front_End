import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Permission, PermissionRequest } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private apiUrl = `${environment.apiUrl}/Permission`;

  constructor(private http: HttpClient) {}

  createPermission(permission: PermissionRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, permission).pipe(catchError(this.handleError));
  }

  getPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getPermission(id: number): Observable<Permission> {
    return this.http.get<Permission>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  deletePermission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('PermissionService Error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}