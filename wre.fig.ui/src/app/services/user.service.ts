import { Injectable, inject } from '@angular/core';
import { HttpClient }          from '@angular/common/http';
import { Observable }          from 'rxjs';
import { map }                 from 'rxjs/operators';
import { environment }         from '../../environments/environment';
import { ApiResponse }         from '../models/api-response.model';
import { UserListDto, CreateUserDto, EditUserDto } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly api  = inject(HttpClient);
  private readonly base = environment.apiUrl;

  // GET unwraps the envelope to the data; mutations return the full envelope
  // so the caller can show the message and check success.
  getUsers(): Observable<UserListDto[]> {
    return this.api.get<ApiResponse<UserListDto[]>>(`${this.base}/users`)
      .pipe(map(r => r.data ?? []));
  }

  createUser(dto: CreateUserDto): Observable<ApiResponse<boolean>> {
    return this.api.post<ApiResponse<boolean>>(`${this.base}/users`, dto);
  }

  updateUser(id: string, dto: EditUserDto): Observable<ApiResponse<boolean>> {
    return this.api.put<ApiResponse<boolean>>(`${this.base}/users/${id}`, dto);
  }

  deactivateUser(id: string): Observable<ApiResponse<boolean>> {
    return this.api.post<ApiResponse<boolean>>(`${this.base}/users/${id}/deactivate`, {});
  }
}
