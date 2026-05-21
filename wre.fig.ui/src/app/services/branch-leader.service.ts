import { Injectable, inject } from '@angular/core';
import { HttpClient }         from '@angular/common/http';
import { Observable }         from 'rxjs';
import { environment }        from '../../environments/environment';

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
    return this.http.get<BranchLeader[]>(`${this.base}/branches/${branchId}/leaders`);
  }

  create(branchId: number, dto: UpsertBranchLeader): Observable<BranchLeader> {
    return this.http.post<BranchLeader>(`${this.base}/branches/${branchId}/leaders`, dto);
  }

  update(branchId: number, id: number, dto: UpsertBranchLeader): Observable<BranchLeader> {
    return this.http.put<BranchLeader>(`${this.base}/branches/${branchId}/leaders/${id}`, dto);
  }

  delete(branchId: number, id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/branches/${branchId}/leaders/${id}`);
  }
}
