import { Injectable, inject } from '@angular/core';
import { HttpClient }          from '@angular/common/http';
import { Observable }          from 'rxjs';
import { map }                 from 'rxjs/operators';
import { environment }         from '../../environments/environment';
import { ApiResponse }         from '../models/api-response.model';
import { BranchSummaryDto, ComplianceDto, BranchListItem } from '../models/branch.model';

@Injectable({ providedIn: 'root' })
export class BranchService {
  private readonly api = inject(HttpClient);
  private readonly base = environment.apiUrl;

  getSummaries(year: number, month: number): Observable<BranchSummaryDto[]> {
    return this.api.get<ApiResponse<BranchSummaryDto[]>>(`${this.base}/branches/summaries`, {
      params: { year: year.toString(), month: month.toString() }
    }).pipe(map(r => r.data ?? []));
  }

  getSummary(id: number, year: number, month: number): Observable<BranchSummaryDto> {
    return this.api.get<ApiResponse<BranchSummaryDto>>(`${this.base}/branches/${id}/summary`, {
      params: { year: year.toString(), month: month.toString() }
    }).pipe(map(r => r.data as BranchSummaryDto));
  }

  getBranchList(): Observable<BranchListItem[]> {
    return this.api.get<ApiResponse<BranchListItem[]>>(`${this.base}/branches/list`)
      .pipe(map(r => r.data ?? []));
  }

  getCompliance(year: number, month: number): Observable<ComplianceDto> {
    return this.api.get<ApiResponse<ComplianceDto>>(`${this.base}/branches/compliance`, {
      params: { year: year.toString(), month: month.toString() }
    }).pipe(map(r => r.data as ComplianceDto));
  }
}
