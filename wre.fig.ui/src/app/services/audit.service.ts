import { Injectable, inject } from '@angular/core';
import { HttpClient }          from '@angular/common/http';
import { Observable }          from 'rxjs';
import { map }                 from 'rxjs/operators';
import { environment }         from '../../environments/environment';
import { ApiResponse }         from '../models/api-response.model';
import { AlertDto } from '../models/audit.model';

@Injectable({ providedIn: 'root' })
export class AuditService {
  private readonly api  = inject(HttpClient);
  private readonly base = environment.apiUrl;

  // Branch/role scoping is handled server-side based on the caller's JWT.
  getAlerts(): Observable<AlertDto[]> {
    return this.api.get<ApiResponse<AlertDto[]>>(`${this.base}/audit/alerts`)
      .pipe(map(r => r.data ?? []));
  }

  getHistory(employeeId: number, date: string): Observable<AlertDto[]> {
    return this.api.get<ApiResponse<AlertDto[]>>(`${this.base}/audit/history`, {
      params: { employeeId: employeeId.toString(), date }
    }).pipe(map(r => r.data ?? []));
  }
}
