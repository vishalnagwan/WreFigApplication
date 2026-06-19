import { Injectable, inject } from '@angular/core';
import { HttpClient }          from '@angular/common/http';
import { Observable }          from 'rxjs';
import { map }                 from 'rxjs/operators';
import { environment }         from '../../environments/environment';
import { ApiResponse }         from '../models/api-response.model';
import { BranchInstructionsDto } from '../models/instruction.model';

@Injectable({ providedIn: 'root' })
export class InstructionService {
  private readonly api  = inject(HttpClient);
  private readonly base = environment.apiUrl;

  // API now returns the standard Response<T> envelope; unwrap .data for GET,
  // return the full envelope for save so callers can read success/message.
  getForBranch(branchId: number): Observable<BranchInstructionsDto> {
    return this.api.get<ApiResponse<BranchInstructionsDto>>(`${this.base}/instructions/${branchId}`)
      .pipe(map(r => r.data as BranchInstructionsDto));
  }

  save(branchId: number, dto: BranchInstructionsDto): Observable<ApiResponse<boolean>> {
    return this.api.put<ApiResponse<boolean>>(`${this.base}/instructions/${branchId}`, dto);
  }
}
