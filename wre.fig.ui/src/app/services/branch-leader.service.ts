import { Injectable, inject } from '@angular/core';
import { HttpClient }         from '@angular/common/http';
import { Observable }         from 'rxjs';
import { map }                from 'rxjs/operators';
import { environment }        from '../../environments/environment';
import { ApiResponse }        from '../models/api-response.model';

export interface BranchLeader {
  id:               number;
  branchId:         number;
  name:             string;
  jobTitle:         string;
  workMobilePhone?: string;
  altPhone?:        string;
  managerName?:     string;
  notes?:           string;
  sortOrder:        number;
}

export interface UpsertBranchLeader {
  branchId:         number;
  name:             string;
  jobTitle:         string;
  workMobilePhone?: string;
  altPhone?:        string;
  managerName?:     string;
  notes?:           string;
  sortOrder:        number;
}

@Injectable({ providedIn: 'root' })
export class BranchLeaderService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  getByBranch(branchId: number): Observable<BranchLeader[]> {
    return this.http.get<ApiResponse<BranchLeader[]>>(`${this.base}/branches/${branchId}/leaders`)
      .pipe(map(r => r.data ?? []));
  }

  create(branchId: number, dto: UpsertBranchLeader): Observable<ApiResponse<BranchLeader>> {
    return this.http.post<ApiResponse<BranchLeader>>(`${this.base}/branches/${branchId}/leaders`, dto);
  }

  update(branchId: number, id: number, dto: UpsertBranchLeader): Observable<ApiResponse<BranchLeader>> {
    return this.http.put<ApiResponse<BranchLeader>>(`${this.base}/branches/${branchId}/leaders/${id}`, dto);
  }

  delete(branchId: number, id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(`${this.base}/branches/${branchId}/leaders/${id}`);
  }
}
