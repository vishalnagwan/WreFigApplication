import { Injectable, inject } from '@angular/core';
import { HttpClient }          from '@angular/common/http';
import { Observable }          from 'rxjs';
import { environment }         from '../../environments/environment';
import { BranchInstructionsDto } from '../models/instruction.model';

@Injectable({ providedIn: 'root' })
export class InstructionService {
  private readonly api  = inject(HttpClient);
  private readonly base = environment.apiUrl;

  getForBranch(branchId: number): Observable<BranchInstructionsDto> {
    return this.api.get<BranchInstructionsDto>(`${this.base}/instructions/${branchId}`);
  }

  save(branchId: number, dto: BranchInstructionsDto): Observable<void> {
    return this.api.put<void>(`${this.base}/instructions/${branchId}`, dto);
  }
}
