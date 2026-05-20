import { Injectable, inject } from '@angular/core';
import { HttpClient }          from '@angular/common/http';
import { Observable }          from 'rxjs';
import { environment }         from '../../environments/environment';
import { EmployeeListDto, CreateEmployeeDto, EditEmployeeDto } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly api  = inject(HttpClient);
  private readonly base = environment.apiUrl;

  getEmployees(): Observable<EmployeeListDto[]> {
    return this.api.get<EmployeeListDto[]>(`${this.base}/employees`);
  }

  createEmployee(dto: CreateEmployeeDto): Observable<EmployeeListDto> {
    return this.api.post<EmployeeListDto>(`${this.base}/employees`, dto);
  }

  updateEmployee(id: number, dto: EditEmployeeDto): Observable<unknown> {
    return this.api.put<unknown>(`${this.base}/employees/${id}`, dto);
  }

  deactivateEmployee(id: number): Observable<unknown> {
    return this.api.post<unknown>(`${this.base}/employees/${id}/deactivate`, {});
  }
}
