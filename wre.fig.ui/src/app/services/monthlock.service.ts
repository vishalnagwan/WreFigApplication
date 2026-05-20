import { Injectable, inject } from '@angular/core';
import { HttpClient }          from '@angular/common/http';
import { Observable }          from 'rxjs';
import { environment }         from '../../environments/environment';
import { MonthLockDto }        from '../models/monthlock.model';

@Injectable({ providedIn: 'root' })
export class MonthLockService {
  private readonly api  = inject(HttpClient);
  private readonly base = environment.apiUrl;

  getAll(): Observable<MonthLockDto[]> {
    return this.api.get<MonthLockDto[]>(`${this.base}/monthlocks`);
  }

  ensureDefaults(): Observable<void> {
    return this.api.post<void>(`${this.base}/monthlocks/ensure-defaults`, {});
  }

  openMonth(year: number, month: number): Observable<void> {
    return this.api.put<void>(`${this.base}/monthlocks/${year}/${month}/open`, {});
  }

  closeMonth(year: number, month: number): Observable<void> {
    return this.api.put<void>(`${this.base}/monthlocks/${year}/${month}/close`, {});
  }
}
