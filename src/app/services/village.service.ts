import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Village, PaginatedResult, PaginationParams } from '../models/village.models';

@Injectable({
  providedIn: 'root',
})
export class VillageService {
  private apiUrl = `${environment.apiUrl}/Village`;

  constructor(private http: HttpClient) {}

  getVillages(params: PaginationParams = {}): Observable<PaginatedResult<Village>> {
    let httpParams = new HttpParams();
    if (params.pageNumber) {
      httpParams = httpParams.set('pageNumber', params.pageNumber.toString());
    }
    if (params.pageSize) {
      httpParams = httpParams.set('pageSize', params.pageSize.toString());
    }
    if (params.cityId) {
      httpParams = httpParams.set('cityId', params.cityId.toString());
    }
    if (params.governorateId) {
      httpParams = httpParams.set('governorateId', params.governorateId.toString());
    }
    if (params.name) {
      httpParams = httpParams.set('name', params.name);
    }

    return this.http.get<PaginatedResult<Village>>(this.apiUrl, { params: httpParams });
  }

  getVillageById(id: number): Observable<Village> {
    return this.http.get<Village>(`${this.apiUrl}/${id}`);
  }

  getVillagesByCity(cityId: number): Observable<Village[]> {
    return this.http.get<Village[]>(`${this.apiUrl}/city/${cityId}`);
  }
}