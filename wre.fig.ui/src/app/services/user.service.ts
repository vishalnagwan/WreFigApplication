import { Injectable, inject } from '@angular/core';
import { HttpClient }          from '@angular/common/http';
import { Observable }          from 'rxjs';
import { environment }         from '../../environments/environment';
import { UserListDto, CreateUserDto, EditUserDto } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly api  = inject(HttpClient);
  private readonly base = environment.apiUrl;

  getUsers(): Observable<UserListDto[]> {
    return this.api.get<UserListDto[]>(`${this.base}/users`);
  }

  createUser(dto: CreateUserDto): Observable<unknown> {
    return this.api.post<unknown>(`${this.base}/users`, dto);
  }

  updateUser(id: string, dto: EditUserDto): Observable<unknown> {
    return this.api.put<unknown>(`${this.base}/users/${id}`, dto);
  }

  deactivateUser(id: string): Observable<unknown> {
    return this.api.post<unknown>(`${this.base}/users/${id}/deactivate`, {});
  }
}
