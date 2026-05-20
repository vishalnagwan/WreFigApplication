import { Injectable, inject } from '@angular/core';
import { HttpClient }          from '@angular/common/http';
import { Observable }          from 'rxjs';
import { environment }         from '../../environments/environment';
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

  getGrid(branchId: number, year: number, month: number): Observable<ScheduleGridDto> {
    return this.api.get<ScheduleGridDto>(`${this.base}/schedule/${branchId}`, {
      params: { year: year.toString(), month: month.toString() }
    });
  }

  upsertCell(req: UpsertCellRequest): Observable<void> {
    return this.api.put<void>(`${this.base}/schedule/cell`, req);
  }

  getNote(employeeId: number, date: string): Observable<NoteResponse> {
    return this.api.get<NoteResponse>(`${this.base}/schedule/note`, {
      params: { employeeId: employeeId.toString(), date }
    });
  }

  upsertNote(req: UpsertNoteRequest): Observable<void> {
    return this.api.put<void>(`${this.base}/schedule/note`, req);
  }

  getStatusCodes(): Observable<StatusCodeDto[]> {
    return this.api.get<StatusCodeDto[]>(`${this.base}/statuscodes`);
  }
}
