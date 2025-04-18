import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Branch, BranchDto } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private apiUrl = `${environment.apiUrl}/Branch`;

  constructor(private http: HttpClient) {}

  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  createBranch(branch: BranchDto): Observable<void> {
    return this.http.post<void>(this.apiUrl, branch).pipe(
      catchError(this.handleError)
    );
  }

  getBranch(id: number): Observable<Branch> {
    return this.http.get<Branch>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateBranch(id: number, branch: BranchDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, branch).pipe(
      catchError(this.handleError)
    );
  }

  deleteBranch(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateBranchStatus(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/status`, null).pipe(
      catchError(this.handleError)
    );
  }

  addUsersToBranch(id: number, userIds: string[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/users`, { userIds }).pipe(
      catchError(this.handleError)
    );
  }

  removeUserFromBranch(id: number, userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/users/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('BranchService Error:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}