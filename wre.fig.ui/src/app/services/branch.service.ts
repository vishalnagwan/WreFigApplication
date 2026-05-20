import { Injectable, inject } from '@angular/core';
import { HttpClient }          from '@angular/common/http';
import { Observable }          from 'rxjs';
import { environment }         from '../../environments/environment';
import { BranchSummaryDto, ComplianceDto, BranchListItem } from '../models/branch.model';

@Injectable({ providedIn: 'root' })
export class BranchService {
  private readonly api = inject(HttpClient);
  private readonly base = environment.apiUrl;

  getSummaries(year: number, month: number): Observable<BranchSummaryDto[]> {
    return this.api.get<BranchSummaryDto[]>(`${this.base}/branches/summaries`, {
      params: { year: year.toString(), month: month.toString() }
    });
  }

  getSummary(id: number, year: number, month: number): Observable<BranchSummaryDto> {
    return this.api.get<BranchSummaryDto>(`${this.base}/branches/${id}/summary`, {
      params: { year: year.toString(), month: month.toString() }
    });
  }

  getBranchList(): Observable<BranchListItem[]> {
    return this.api.get<BranchListItem[]>(`${this.base}/branches/list`);
  }

  getCompliance(year: number, month: number): Observable<ComplianceDto> {
    return this.api.get<ComplianceDto>(`${this.base}/branches/compliance`, {
      params: { year: year.toString(), month: month.toString() }
    });
  }
}
