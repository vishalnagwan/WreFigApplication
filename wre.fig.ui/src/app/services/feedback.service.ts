import { Injectable, inject } from '@angular/core';
import { HttpClient }          from '@angular/common/http';
import { Observable }          from 'rxjs';
import { map }                 from 'rxjs/operators';
import { environment }         from '../../environments/environment';
import { ApiResponse }         from '../models/api-response.model';
import { CreateFeedbackDto, FeedbackItemDto } from '../models/feedback.model';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  submit(dto: CreateFeedbackDto): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(`${this.base}/feedback`, dto);
  }

  getByPage(page: string): Observable<FeedbackItemDto[]> {
    return this.http.get<ApiResponse<FeedbackItemDto[]>>(`${this.base}/feedback/page/${encodeURIComponent(page)}`)
      .pipe(map(r => r.data ?? []));
  }

  getReport(): Observable<FeedbackItemDto[]> {
    return this.http.get<ApiResponse<FeedbackItemDto[]>>(`${this.base}/feedback/report`)
      .pipe(map(r => r.data ?? []));
  }

  toggleImplemented(id: number): Observable<ApiResponse<boolean>> {
    return this.http.patch<ApiResponse<boolean>>(`${this.base}/feedback/${id}/toggle`, {});
  }
}
