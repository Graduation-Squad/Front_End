import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserGroup } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserGroupService {
  private apiUrl = `${environment.apiUrl}/UserGroup`;

  constructor(private http: HttpClient) {}

  createUserGroup(group: UserGroup): Observable<void> {
    return this.http.post<void>(this.apiUrl, group).pipe(catchError(this.handleError));
  }

  getUserGroups(): Observable<UserGroup[]> {
    return this.http.get<UserGroup[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getUserGroup(id: number): Observable<UserGroup> {
    return this.http.get<UserGroup>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  deleteUserGroup(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  addPermission(userGroupId: number, permissionId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${userGroupId}/permissions/${permissionId}`, null).pipe(catchError(this.handleError));
  }

  removePermission(userGroupId: number, permissionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userGroupId}/permissions/${permissionId}`).pipe(catchError(this.handleError));
  }

  addMultiplePermissions(userGroupId: number, permissionIds: number[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${userGroupId}/permissions`, { permissionIds }).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('UserGroupService Error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}