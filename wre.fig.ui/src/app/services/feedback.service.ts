import { Injectable, inject } from '@angular/core';
import { HttpClient }          from '@angular/common/http';
import { Observable }          from 'rxjs';
import { environment }         from '../../environments/environment';
import { CreateFeedbackDto, FeedbackItemDto } from '../models/feedback.model';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  submit(dto: CreateFeedbackDto): Observable<void> {
    return this.http.post<void>(`${this.base}/feedback`, dto);
  }

  getByPage(page: string): Observable<FeedbackItemDto[]> {
    return this.http.get<FeedbackItemDto[]>(`${this.base}/feedback/page/${encodeURIComponent(page)}`);
  }

  getReport(): Observable<FeedbackItemDto[]> {
    return this.http.get<FeedbackItemDto[]>(`${this.base}/feedback/report`);
  }

  toggleImplemented(id: number): Observable<void> {
    return this.http.patch<void>(`${this.base}/feedback/${id}/toggle`, {});
  }
}
