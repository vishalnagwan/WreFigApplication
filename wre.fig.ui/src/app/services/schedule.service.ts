import { Injectable, inject } from '@angular/core';
import { HttpClient }          from '@angular/common/http';
import { Observable }          from 'rxjs';
import { map }                 from 'rxjs/operators';
import { environment }         from '../../environments/environment';
import { ApiResponse }         from '../models/api-response.model';
import {
  ScheduleGridDto,
  NoteResponse,
  StatusCodeDto,
  UpsertCellRequest,
  UpsertNoteRequest
} from '../models/schedule.model';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  private readonly api  = inject(HttpClient);
  private readonly base = environment.apiUrl;

  getGrid(branchId: number, year: number, month: number): Observable<ScheduleGridDto | null> {
    return this.api.get<ApiResponse<ScheduleGridDto>>(`${this.base}/schedule/${branchId}`, {
      params: { year: year.toString(), month: month.toString() }
    }).pipe(map(r => r.data ?? null));
  }

  upsertCell(req: UpsertCellRequest): Observable<ApiResponse<boolean>> {
    return this.api.put<ApiResponse<boolean>>(`${this.base}/schedule/cell`, req);
  }

  getNote(employeeId: number, date: string): Observable<NoteResponse> {
    return this.api.get<ApiResponse<string | null>>(`${this.base}/schedule/note`, {
      params: { employeeId: employeeId.toString(), date }
    }).pipe(map(r => ({ note: r.data ?? null } as NoteResponse)));
  }

  upsertNote(req: UpsertNoteRequest): Observable<ApiResponse<boolean>> {
    return this.api.put<ApiResponse<boolean>>(`${this.base}/schedule/note`, req);
  }

  getStatusCodes(): Observable<StatusCodeDto[]> {
    return this.api.get<ApiResponse<StatusCodeDto[]>>(`${this.base}/statuscodes`)
      .pipe(map(r => r.data ?? []));
  }
}
