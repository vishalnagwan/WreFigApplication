import { Injectable, inject } from '@angular/core';
import { HttpClient }          from '@angular/common/http';
import { Observable }          from 'rxjs';
import { map }                 from 'rxjs/operators';
import { environment }         from '../../environments/environment';
import { ApiResponse }         from '../models/api-response.model';
import { MonthLockDto }        from '../models/monthlock.model';

@Injectable({ providedIn: 'root' })
export class MonthLockService {
  private readonly api  = inject(HttpClient);
  private readonly base = environment.apiUrl;

  getAll(): Observable<MonthLockDto[]> {
    return this.api.get<ApiResponse<MonthLockDto[]>>(`${this.base}/monthlocks`)
      .pipe(map(r => r.data ?? []));
  }

  ensureDefaults(): Observable<ApiResponse<boolean>> {
    return this.api.post<ApiResponse<boolean>>(`${this.base}/monthlocks/ensure-defaults`, {});
  }

  openMonth(year: number, month: number): Observable<ApiResponse<boolean>> {
    return this.api.put<ApiResponse<boolean>>(`${this.base}/monthlocks/${year}/${month}/open`, {});
  }

  closeMonth(year: number, month: number): Observable<ApiResponse<boolean>> {
    return this.api.put<ApiResponse<boolean>>(`${this.base}/monthlocks/${year}/${month}/close`, {});
  }
}
