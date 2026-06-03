import { Component, OnInit, inject } from '@angular/core';
import { CommonModule }              from '@angular/common';
import { FormsModule }               from '@angular/forms';
import { UserService }               from '../../../services/user.service';
import { BranchService }             from '../../../services/branch.service';
import { UserListDto, CreateUserDto, EditUserDto } from '../../../models/user.model';
import { BranchListItem }            from '../../../models/branch.model';
import { environment }               from '../../../../environments/environment';
type ModalMode = 'create' | 'edit';

const ALL_ROLES = [
  'Admin','FieldSupervisor','DispatchSupervisor',
  'Planner','Dispatcher','OtherEmployee'
];

@Component({
  selector:   'app-users',
  standalone: true,
  imports:    [CommonModule, FormsModule],
  template: `
<div class="page-header">
  <h1>User Management</h1>
  <div style="display:flex;gap:.75rem;align-items:center;margin-left:auto;">
    <!-- Search with clear button -->
    <div class="search-wrap">
      <input type="text" class="home-search-input" placeholder="Search by name, email, role…"
             [(ngModel)]="searchText" (ngModelChange)="onSearch()" />
      <button *ngIf="searchText" class="search-clear-btn" (click)="clearSearch()" title="Clear search">✕</button>
    </div>
    <button class="btn-primary" (click)="openCreate()">+ New User</button>
  </div>
</div>

<div *ngIf="loading" style="text-align:center;padding:3rem;color:var(--ink-faint);">Loading...</div>

<table class="users-table" *ngIf="!loading">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Branches</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let u of pagedRows">
      <td>{{u.fullName}}</td>
      <td>{{u.email}}</td>
      <td>{{formatRole(u.role)}}</td>
      <td>
        <div class="branch-tags">
          <!-- Show "All" when user has all branches assigned -->
          <span class="branch-tag" *ngIf="isAllBranches(u)">All</span>
          <ng-container *ngIf="!isAllBranches(u)">
            <span class="branch-tag" *ngFor="let n of u.branchNames">{{n}}</span>
            <span *ngIf="u.branchNames.length === 0" style="color:var(--ink-faint);font-size:.75rem;">—</span>
          </ng-container>
        </div>
      </td>
      <td>
        <span class="status-pill" [class]="u.isActive ? 'green' : 'red'">
          {{u.isActive ? 'Active' : 'Inactive'}}
        </span>
      </td>
      <td>
        <button class="btn-ghost btn-sm" (click)="openEdit(u)" style="margin-right:.4rem;">Edit</button>
        <button class="btn-danger btn-sm" (click)="deactivate(u)"
                *ngIf="u.isActive" [disabled]="saving">Deactivate</button>
      </td>
    </tr>
    <tr *ngIf="filtered.length === 0">
      <td colspan="6" style="text-align:center;color:var(--ink-faint);padding:2rem;">
        {{users.length === 0 ? 'No users found.' : 'No results match "' + searchText + '".'}}
      </td>
    </tr>
  </tbody>
</table>

<!-- Paging footer -->
<div class="dashboard-footer" *ngIf="!loading && users.length > 0">
  <span>Showing {{pageStart}}–{{pageEnd}} of {{filtered.length}} user{{filtered.length !== 1 ? 's' : ''}}</span>
  <div class="paging-controls" *ngIf="totalPages > 1">
    <button class="btn-icon" (click)="goPage(currentPage - 1)" [disabled]="currentPage === 1">‹</button>
    <span style="font-size:.82rem;">Page {{currentPage}} of {{totalPages}}</span>
    <button class="btn-icon" (click)="goPage(currentPage + 1)" [disabled]="currentPage === totalPages">›</button>
  </div>
</div>

<!-- Modal -->
<div class="modal-overlay" *ngIf="showModal" (click)="onOverlayClick($event)">
  <div class="modal-card" (click)="$event.stopPropagation()">
    <div class="modal-header">
      {{modalMode === 'create' ? 'Create User' : 'Edit User'}}
      <button class="btn-icon" (click)="closeModal()">✕</button>
    </div>
    <div class="modal-body">
      <div class="field">
        <label>Full Name</label>
        <input type="text" [(ngModel)]="form.fullName" placeholder="Full name" />
      </div>
      <div class="field">
        <label>Email</label>
        <input type="email" [(ngModel)]="form.email" placeholder="Email address" />
      </div>
      <div class="field">
        <label>Password {{modalMode === 'edit' ? '(leave blank to keep current)' : ''}}</label>
        <input type="password" [(ngModel)]="form.password" placeholder="Password" />
      </div>
      <div class="field">
        <label>Role</label>
        <select [(ngModel)]="form.role">
          <option value="">Select role...</option>
          <option *ngFor="let r of allRoles" [value]="r">{{formatRole(r)}}</option>
        </select>
      </div>
      <div class="field" *ngIf="modalMode === 'edit'">
        <label>
          <input type="checkbox" [(ngModel)]="form.isActive" />
          Active
        </label>
      </div>
      <div class="field">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.35rem;">
          <label style="margin:0;">Branches</label>
          <label class="checkbox-item" style="margin:0;font-size:.8rem;color:var(--ink-light);gap:.3rem;">
            <input type="checkbox"
                   [checked]="allBranchesChecked"
                   [indeterminate]="someBranchesChecked"
                   (change)="toggleAllBranches($event)" />
            All
          </label>
        </div>
        <div class="checkbox-grid scrollable-panel">
          <label class="checkbox-item" *ngFor="let b of branches">
            <input type="checkbox"
                   [checked]="form.branchIds.includes(b.id)"
                   (change)="toggleBranch(b.id, $event)" />
            {{b.name}}
          </label>
        </div>
      </div>
      <p *ngIf="modalError" style="color:#dc2626;font-size:.82rem;">{{modalError}}</p>
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
export class UsersComponent implements OnInit {
  private userSvc   = inject(UserService);
  private branchSvc = inject(BranchService);

  users:    UserListDto[]  = [];
  filtered: UserListDto[]  = [];
  branches: BranchListItem[] = [];
  searchText = '';
  loading  = true;
  saving   = false;
  showModal   = false;
  modalMode: ModalMode = 'create';
  selectedUser: UserListDto | null = null;
  modalError = '';

  // Paging
  currentPage = 1;
  readonly pageSize = environment.pageSize;

  allRoles = ALL_ROLES;

  form = {
    fullName:  '',
    email:     '',
    password:  '',
    role:      '',
    branchIds: [] as number[],
    isActive:  true
  };

  private static readonly ROLE_LABELS: Record<string, string> = {
    Admin:              'Admin',
    FieldSupervisor:    'Field Supervisor',
    DispatchSupervisor: 'Dispatch Supervisor',
    Planner:            'Planner',
    Dispatcher:         'Dispatcher',
    OtherEmployee:      'Other Employee'
  };

  formatRole(role: string): string {
    return UsersComponent.ROLE_LABELS[role] ?? role;
  }

  /** Returns true when the user has all available branches assigned */
  isAllBranches(u: UserListDto): boolean {
    return this.branches.length > 0 && u.branchIds.length === this.branches.length;
  }

  get totalPages(): number { return Math.max(1, Math.ceil(this.filtered.length / this.pageSize)); }

  get pageStart(): number {
    if (this.filtered.length === 0) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get pageEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.filtered.length);
  }

  get pagedRows(): UserListDto[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  ngOnInit(): void {
    this.loadUsers();
    this.branchSvc.getBranchList().subscribe({
      next: b => this.branches = b,
      error: () => { /* silent */ }
    });
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
      ? this.users.filter(u =>
          u.fullName.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          this.formatRole(u.role).toLowerCase().includes(q) ||
          u.branchNames.some(n => n.toLowerCase().includes(q)))
      : [...this.users];
  }

  goPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  openCreate(): void {
    this.modalMode    = 'create';
    this.selectedUser = null;
    this.form = { fullName:'', email:'', password:'', role:'', branchIds:[], isActive:true };
    this.modalError = '';
    this.showModal = true;
  }

  openEdit(u: UserListDto): void {
    this.modalMode    = 'edit';
    this.selectedUser = u;
    this.form = {
      fullName:  u.fullName,
      email:     u.email,
      password:  '',
      role:      u.role,
      branchIds: [...u.branchIds],
      isActive:  u.isActive
    };
    this.modalError = '';
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  get allBranchesChecked(): boolean {
    return this.branches.length > 0 && this.form.branchIds.length === this.branches.length;
  }

  get someBranchesChecked(): boolean {
    return this.form.branchIds.length > 0 && this.form.branchIds.length < this.branches.length;
  }

  toggleAllBranches(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.form.branchIds = checked ? this.branches.map(b => b.id) : [];
  }

  toggleBranch(id: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.form.branchIds.includes(id)) this.form.branchIds.push(id);
    } else {
      this.form.branchIds = this.form.branchIds.filter(b => b !== id);
    }
  }

  saveModal(): void {
    if (!this.form.fullName || !this.form.email || !this.form.role) {
      this.modalError = 'Full name, email, and role are required.';
      return;
    }
    this.saving = true;
    this.modalError = '';

    if (this.modalMode === 'create') {
      if (!this.form.password) {
        this.modalError = 'Password is required for new users.';
        this.saving = false;
        return;
      }
      const dto: CreateUserDto = {
        fullName:          this.form.fullName,
        email:             this.form.email,
        password:          this.form.password,
        role:              this.form.role,
        branchIds:         this.form.branchIds,
        resourceTypeNames: []
      };
      this.userSvc.createUser(dto).subscribe({
        next: () => { this.saving = false; this.showModal = false; this.loadUsers(); },
        error: (err) => { this.saving = false; this.modalError = err?.error?.error ?? 'Save failed. Please try again.'; }
      });
    } else {
      const dto: EditUserDto = {
        fullName:          this.form.fullName,
        email:             this.form.email,
        password:          this.form.password || null,
        role:              this.form.role,
        branchIds:         this.form.branchIds,
        resourceTypeNames: this.selectedUser?.resourceTypeNames ?? [],
        isActive:          this.form.isActive
      };
      this.userSvc.updateUser(this.selectedUser!.id, dto).subscribe({
        next: () => { this.saving = false; this.showModal = false; this.loadUsers(); },
        error: (err) => { this.saving = false; this.modalError = err?.error?.error ?? 'Save failed. Please try again.'; }
      });
    }
  }

  deactivate(u: UserListDto): void {
    if (!confirm(`Deactivate ${u.fullName}?`)) return;
    this.saving = true;
    this.userSvc.deactivateUser(u.id).subscribe({
      next: () => { this.saving = false; this.loadUsers(); },
      error: () => { this.saving = false; }
    });
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }

  private loadUsers(): void {
    this.loading = true;
    this.userSvc.getUsers().subscribe({
      next: u => { this.users = u; this.applyFilter(); this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
