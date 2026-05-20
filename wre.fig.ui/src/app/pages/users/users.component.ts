import { Component, OnInit, inject } from '@angular/core';
import { CommonModule }              from '@angular/common';
import { FormsModule }               from '@angular/forms';
import { UserService }               from '../../services/user.service';
import { BranchService }             from '../../services/branch.service';
import { UserListDto, CreateUserDto, EditUserDto } from '../../models/user.model';
import { BranchListItem }            from '../../models/branch.model';
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
  <button class="btn-primary" (click)="openCreate()" style="margin-left:auto;">+ New User</button>
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
    <tr *ngFor="let u of users">
      <td>{{u.fullName}}</td>
      <td>{{u.email}}</td>
      <td>{{formatRole(u.role)}}</td>
      <td>
        <div class="branch-tags">
          <span class="branch-tag" *ngFor="let n of u.branchNames">{{n}}</span>
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
    <tr *ngIf="users.length === 0">
      <td colspan="6" style="text-align:center;color:var(--ink-faint);padding:2rem;">No users found.</td>
    </tr>
  </tbody>
</table>

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
  `
})
export class UsersComponent implements OnInit {
  private userSvc   = inject(UserService);
  private branchSvc = inject(BranchService);

  users:    UserListDto[]  = [];
  branches: BranchListItem[] = [];
  loading  = true;
  saving   = false;
  showModal   = false;
  modalMode: ModalMode = 'create';
  selectedUser: UserListDto | null = null;
  modalError = '';

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

  ngOnInit(): void {
    this.loadUsers();
    this.branchSvc.getBranchList().subscribe({
      next: b => this.branches = b,
      error: () => { /* silent */ }
    });
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
        error: () => { this.saving = false; this.modalError = 'Save failed. Please try again.'; }
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
        error: () => { this.saving = false; this.modalError = 'Save failed. Please try again.'; }
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
      next: u => { this.users = u; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
