import { Component, OnInit, inject } from '@angular/core';
import { CommonModule }              from '@angular/common';
import { FormsModule }               from '@angular/forms';
import { EmployeeService }           from '../../services/employee.service';
import { BranchService }             from '../../services/branch.service';
import { EmployeeListDto, CreateEmployeeDto, EditEmployeeDto } from '../../models/employee.model';
import { BranchListItem }            from '../../models/branch.model';
import { RESOURCE_TYPES }            from '../../../constants';
import { environment }               from '../../../environments/environment';

type ModalMode = 'create' | 'edit';

@Component({
  selector:   'app-technician',
  standalone: true,
  imports:    [CommonModule, FormsModule],
  template: `
<div class="page-header">
  <h1>Technician Management</h1>
  <div style="display:flex;gap:.75rem;align-items:center;margin-left:auto;">
    <!-- Search with clear button -->
    <div class="search-wrap">
      <input type="text" class="home-search-input" placeholder="Search by name, branch, resource type…"
             [(ngModel)]="searchText" (ngModelChange)="onSearch()" />
      <button *ngIf="searchText" class="search-clear-btn" (click)="clearSearch()" title="Clear search">✕</button>
    </div>
    <button class="btn-primary" (click)="openCreate()">+ New Technician</button>
  </div>
</div>

<div *ngIf="loading" style="text-align:center;padding:3rem;color:var(--ink-faint);">Loading...</div>

<table class="users-table" *ngIf="!loading">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Branch</th>
      <th>Resource Types</th>
      <th>Shift</th>
      <th>Phone</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let e of pagedRows">
      <td>
        <div style="font-weight:600;">{{e.name}}</div>
        <div *ngIf="e.jobTitle" style="font-size:.75rem;color:var(--ink-light);">{{e.jobTitle}}</div>
      </td>
      <td style="font-size:.82rem;">{{e.email || '—'}}</td>
      <td style="font-size:.82rem;">{{e.branchName}}</td>
      <td>
        <div class="branch-tags">
          <span class="branch-tag resource-tag" *ngFor="let rt of e.resourceTypes">{{rt}}</span>
          <span *ngIf="e.resourceTypes.length === 0" style="color:var(--ink-faint);font-size:.75rem;">—</span>
        </div>
      </td>
      <td>
        <span class="shift-badge" [class]="e.defaultShift === 'AM' ? 'am' : 'pm'">
          {{e.defaultShift}}
        </span>
      </td>
      <td style="font-size:.82rem;">{{e.workPhone || e.workMobilePhone || '—'}}</td>
      <td>
        <span class="status-pill" [class]="e.isActive ? 'green' : 'red'">
          {{e.isActive ? 'Active' : 'Inactive'}}
        </span>
      </td>
      <td>
        <button class="btn-ghost btn-sm" (click)="openEdit(e)" style="margin-right:.4rem;">Edit</button>
        <button class="btn-danger btn-sm" (click)="deactivate(e)"
                *ngIf="e.isActive" [disabled]="saving">Deactivate</button>
      </td>
    </tr>
    <tr *ngIf="filtered.length === 0">
      <td colspan="8" style="text-align:center;color:var(--ink-faint);padding:2rem;">
        {{employees.length === 0 ? 'No technicians found.' : 'No results match "' + searchText + '".'}}
      </td>
    </tr>
  </tbody>
</table>

<!-- Paging footer -->
<div class="dashboard-footer" *ngIf="!loading && employees.length > 0">
  <span>Showing {{pageStart}}–{{pageEnd}} of {{filtered.length}} technician{{filtered.length !== 1 ? 's' : ''}}
        ({{activeCount}} active)</span>
  <div class="paging-controls" *ngIf="totalPages > 1">
    <button class="btn-icon" (click)="goPage(currentPage - 1)" [disabled]="currentPage === 1">‹</button>
    <span style="font-size:.82rem;">Page {{currentPage}} of {{totalPages}}</span>
    <button class="btn-icon" (click)="goPage(currentPage + 1)" [disabled]="currentPage === totalPages">›</button>
  </div>
</div>

<!-- Modal -->
<div class="modal-overlay" *ngIf="showModal" (click)="onOverlayClick($event)">
  <div class="modal-card modal-wide" (click)="$event.stopPropagation()">
    <div class="modal-header">
      {{modalMode === 'create' ? 'New Technician' : 'Edit Technician'}}
      <button class="btn-icon" (click)="closeModal()">✕</button>
    </div>
    <div class="modal-body">

      <!-- Row 1: Name + Email -->
      <div class="form-row-2">
        <div class="field">
          <label>Full Name <span class="req">*</span></label>
          <input type="text" [(ngModel)]="form.name" placeholder="Full name" />
        </div>
        <div class="field">
          <label>Email</label>
          <input type="email" [(ngModel)]="form.email" placeholder="email@example.com" />
        </div>
      </div>

      <!-- Row 2: Job Title + Branch -->
      <div class="form-row-2">
        <div class="field">
          <label>Job Title</label>
          <input type="text" [(ngModel)]="form.jobTitle" placeholder="e.g. Driver, Driver Trainee" />
        </div>
        <div class="field">
          <label>Branch <span class="req">*</span></label>
          <select [(ngModel)]="form.branchId">
            <option [value]="0">Select branch...</option>
            <option *ngFor="let b of branches" [value]="b.id">{{b.name}}</option>
          </select>
        </div>
      </div>

      <!-- Row 3: Default Shift + Manager -->
      <div class="form-row-2">
        <div class="field">
          <label>Default Shift</label>
          <div class="shift-toggle">
            <button class="shift-opt" [class.active]="form.defaultShift === 'AM'"
                    (click)="form.defaultShift = 'AM'">AM</button>
            <button class="shift-opt" [class.active]="form.defaultShift === 'PM'"
                    (click)="form.defaultShift = 'PM'">PM</button>
          </div>
        </div>
        <div class="field">
          <label>Manager Name</label>
          <input type="text" [(ngModel)]="form.managerName" placeholder="Manager" />
        </div>
      </div>

      <!-- Row 4: Truck + Truck ID -->
      <div class="form-row-2">
        <div class="field">
          <label>Truck Assignment</label>
          <input type="text" [(ngModel)]="form.truckAssignment" placeholder="e.g. 3,800g" />
        </div>
        <div class="field">
          <label>Truck ID</label>
          <input type="text" [(ngModel)]="form.truckId" placeholder="e.g. #PJ1709" />
        </div>
      </div>

      <!-- Row 5: Phones -->
      <div class="form-row-2">
        <div class="field">
          <label>Work Phone</label>
          <input type="text" [(ngModel)]="form.workPhone" placeholder="(555) 555-0100" />
        </div>
        <div class="field">
          <label>Mobile Phone</label>
          <input type="text" [(ngModel)]="form.workMobilePhone" placeholder="(555) 555-0100" />
        </div>
      </div>

      <!-- Resource Types -->
      <div class="field">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.35rem;">
          <label style="margin:0;">Resource Types</label>
          <label class="checkbox-item" style="margin:0;font-size:.8rem;color:var(--ink-light);gap:.3rem;">
            <input type="checkbox"
                   [checked]="allTypesChecked"
                   [indeterminate]="someTypesChecked"
                   (change)="toggleAllTypes($event)" />
            All
          </label>
        </div>
        <div class="checkbox-grid scrollable-panel">
          <label class="checkbox-item" *ngFor="let rt of allResourceTypes">
            <input type="checkbox"
                   [checked]="form.resourceTypes.includes(rt)"
                   (change)="toggleResourceType(rt, $event)" />
            {{rt}}
          </label>
        </div>
      </div>

      <!-- Active toggle (edit only) -->
      <div class="field" *ngIf="modalMode === 'edit'">
        <label class="checkbox-item" style="gap:.5rem;">
          <input type="checkbox" [(ngModel)]="form.isActive" />
          Active
        </label>
      </div>

      <p *ngIf="modalError" style="color:#dc2626;font-size:.82rem;margin-top:.5rem;">{{modalError}}</p>
    </div>
    <div class="modal-footer">
      <button class="btn-ghost" (click)="closeModal()" [disabled]="saving">Cancel</button>
      <button class="btn-primary" (click)="saveModal()" [disabled]="saving">
        {{saving ? 'Saving...' : 'Save'}}
      </button>
    </div>
  </div>
</div>
  `,
  styles: [`
    .search-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }
    .search-wrap .home-search-input {
      width: 260px;
      padding-right: 2rem;
    }
    .search-clear-btn {
      position: absolute;
      right: .5rem;
      background: none;
      border: none;
      cursor: pointer;
      font-size: .75rem;
      color: var(--ink-light, #6b7280);
      line-height: 1;
      padding: 0;
    }
    .search-clear-btn:hover { color: var(--ink, #1f2937); }
    .paging-controls {
      display: flex;
      align-items: center;
      gap: .5rem;
    }
  `]
})
export class TechnicianComponent implements OnInit {
  private empSvc    = inject(EmployeeService);
  private branchSvc = inject(BranchService);

  employees: EmployeeListDto[] = [];
  filtered:  EmployeeListDto[] = [];
  branches:  BranchListItem[]  = [];
  searchText = '';
  loading  = true;
  saving   = false;
  showModal   = false;
  modalMode: ModalMode = 'create';
  selectedEmp: EmployeeListDto | null = null;
  modalError = '';

  // Paging
  currentPage = 1;
  readonly pageSize = environment.pageSize;

  allResourceTypes = RESOURCE_TYPES;

  form = {
    name:            '',
    email:           '' as string | null,
    jobTitle:        '' as string | null,
    resourceTypes:   [] as string[],
    defaultShift:    'AM',
    truckAssignment: '' as string | null,
    truckId:         '' as string | null,
    managerName:     '' as string | null,
    workPhone:       '' as string | null,
    workMobilePhone: '' as string | null,
    branchId:        0,
    isActive:        true,
  };

  get activeCount(): number { return this.employees.filter(e => e.isActive).length; }

  get totalPages(): number { return Math.max(1, Math.ceil(this.filtered.length / this.pageSize)); }

  get pageStart(): number {
    if (this.filtered.length === 0) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get pageEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.filtered.length);
  }

  get pagedRows(): EmployeeListDto[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  get allTypesChecked(): boolean {
    return this.allResourceTypes.length > 0 &&
           this.form.resourceTypes.length === this.allResourceTypes.length;
  }
  get someTypesChecked(): boolean {
    return this.form.resourceTypes.length > 0 &&
           this.form.resourceTypes.length < this.allResourceTypes.length;
  }

  ngOnInit(): void {
    this.loadEmployees();
    this.branchSvc.getBranchList().subscribe({ next: b => this.branches = b, error: () => {} });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.applyFilter();
  }

  clearSearch(): void {
    this.searchText  = '';
    this.currentPage = 1;
    this.applyFilter();
  }

  applyFilter(): void {
    const q = this.searchText.toLowerCase();
    this.filtered = q
      ? this.employees.filter(e =>
          e.name.toLowerCase().includes(q) ||
          (e.email ?? '').toLowerCase().includes(q) ||
          e.branchName.toLowerCase().includes(q) ||
          (e.jobTitle ?? '').toLowerCase().includes(q) ||
          e.resourceTypes.some(rt => rt.toLowerCase().includes(q)))
      : [...this.employees];
  }

  goPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  openCreate(): void {
    this.modalMode    = 'create';
    this.selectedEmp  = null;
    this.resetForm();
    this.modalError   = '';
    this.showModal    = true;
  }

  openEdit(e: EmployeeListDto): void {
    this.modalMode   = 'edit';
    this.selectedEmp = e;
    this.form = {
      name:            e.name,
      email:           e.email,
      jobTitle:        e.jobTitle,
      resourceTypes:   [...e.resourceTypes],
      defaultShift:    e.defaultShift,
      truckAssignment: e.truckAssignment,
      truckId:         e.truckId,
      managerName:     e.managerName,
      workPhone:       e.workPhone,
      workMobilePhone: e.workMobilePhone,
      branchId:        e.branchId,
      isActive:        e.isActive,
    };
    this.modalError = '';
    this.showModal  = true;
  }

  closeModal(): void { this.showModal = false; }

  toggleAllTypes(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.form.resourceTypes = checked ? [...this.allResourceTypes] : [];
  }

  toggleResourceType(rt: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.form.resourceTypes.includes(rt)) this.form.resourceTypes.push(rt);
    } else {
      this.form.resourceTypes = this.form.resourceTypes.filter(r => r !== rt);
    }
  }

  saveModal(): void {
    if (!this.form.name?.trim()) { this.modalError = 'Full name is required.'; return; }
    if (!this.form.branchId)     { this.modalError = 'Branch is required.'; return; }
    this.saving = true;
    this.modalError = '';

    const nullify = (v: string | null) => (v?.trim() || null);

    if (this.modalMode === 'create') {
      const dto: CreateEmployeeDto = {
        name:            this.form.name.trim(),
        email:           nullify(this.form.email as string),
        jobTitle:        nullify(this.form.jobTitle as string),
        resourceTypes:   this.form.resourceTypes,
        defaultShift:    this.form.defaultShift,
        truckAssignment: nullify(this.form.truckAssignment as string),
        truckId:         nullify(this.form.truckId as string),
        managerName:     nullify(this.form.managerName as string),
        workPhone:       nullify(this.form.workPhone as string),
        workMobilePhone: nullify(this.form.workMobilePhone as string),
        branchId:        this.form.branchId,
      };
      this.empSvc.createEmployee(dto).subscribe({
        next: () => { this.saving = false; this.showModal = false; this.loadEmployees(); },
        error: () => { this.saving = false; this.modalError = 'Save failed. Please try again.'; }
      });
    } else {
      const dto: EditEmployeeDto = {
        name:            this.form.name.trim(),
        email:           nullify(this.form.email as string),
        jobTitle:        nullify(this.form.jobTitle as string),
        resourceTypes:   this.form.resourceTypes,
        defaultShift:    this.form.defaultShift,
        truckAssignment: nullify(this.form.truckAssignment as string),
        truckId:         nullify(this.form.truckId as string),
        managerName:     nullify(this.form.managerName as string),
        workPhone:       nullify(this.form.workPhone as string),
        workMobilePhone: nullify(this.form.workMobilePhone as string),
        branchId:        this.form.branchId,
        isActive:        this.form.isActive,
      };
      this.empSvc.updateEmployee(this.selectedEmp!.id, dto).subscribe({
        next: () => { this.saving = false; this.showModal = false; this.loadEmployees(); },
        error: () => { this.saving = false; this.modalError = 'Save failed. Please try again.'; }
      });
    }
  }

  deactivate(e: EmployeeListDto): void {
    if (!confirm(`Deactivate ${e.name}?`)) return;
    this.saving = true;
    this.empSvc.deactivateEmployee(e.id).subscribe({
      next: () => { this.saving = false; this.loadEmployees(); },
      error: () => { this.saving = false; }
    });
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) this.closeModal();
  }

  private loadEmployees(): void {
    this.loading = true;
    this.empSvc.getEmployees().subscribe({
      next: data => { this.employees = data; this.applyFilter(); this.loading = false; },
      error: ()   => { this.loading = false; }
    });
  }

  private resetForm(): void {
    this.form = {
      name: '', email: null, jobTitle: null,
      resourceTypes: ['Technician'],
      defaultShift: 'AM',
      truckAssignment: null, truckId: null, managerName: null,
      workPhone: null, workMobilePhone: null,
      branchId: 0, isActive: true,
    };
  }
}
