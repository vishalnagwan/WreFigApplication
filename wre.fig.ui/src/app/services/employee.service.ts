import { Injectable, inject } from '@angular/core';
import { HttpClient }          from '@angular/common/http';
import { Observable }          from 'rxjs';
import { map }                 from 'rxjs/operators';
import { environment }         from '../../environments/environment';
import { ApiResponse }         from '../models/api-response.model';
import { EmployeeListDto, CreateEmployeeDto, EditEmployeeDto } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly api  = inject(HttpClient);
  private readonly base = environment.apiUrl;

  getEmployees(): Observable<EmployeeListDto[]> {
    return this.api.get<ApiResponse<EmployeeListDto[]>>(`${this.base}/employees`)
      .pipe(map(r => r.data ?? []));
  }

  createEmployee(dto: CreateEmployeeDto): Observable<ApiResponse<EmployeeListDto>> {
    return this.api.post<ApiResponse<EmployeeListDto>>(`${this.base}/employees`, dto);
  }

  updateEmployee(id: number, dto: EditEmployeeDto): Observable<ApiResponse<boolean>> {
    return this.api.put<ApiResponse<boolean>>(`${this.base}/employees/${id}`, dto);
  }

  deactivateEmployee(id: number): Observable<ApiResponse<boolean>> {
    return this.api.post<ApiResponse<boolean>>(`${this.base}/employees/${id}/deactivate`, {});
  }
}
