import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../../core/services/role.service';
import { Role } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AdminComponent implements OnInit {
  roles: Role[] = [];
  newRole: string = '';
  loading: boolean = true;
  error: string = '';
  success: string = '';

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.loading = true;
    this.roleService.getAllRoles().subscribe({
      next: (response) => {
        if (response.success) {
          this.roles = response.data;
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to load roles';
        this.loading = false;
      }
    });
  }

  createRole(): void {
    if (!this.newRole.trim()) {
      this.error = 'Role name is required';
      return;
    }

    this.roleService.createRole({ role: this.newRole.trim() }).subscribe({
      next: (response) => {
        if (response.success) {
          this.roles.push(response.data);
          this.newRole = '';
          this.success = 'Role created successfully';
          this.error = '';
        }
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to create role';
        this.success = '';
      }
    });
  }

  updateRole(id: string, newRole: string): void {
    if (!newRole.trim()) {
      this.error = 'Role name is required';
      return;
    }

    this.roleService.updateRole(id, { role: newRole.trim() }).subscribe({
      next: (response) => {
        if (response.success) {
          const index = this.roles.findIndex(r => r._id === id);
          if (index !== -1) {
            this.roles[index] = response.data;
          }
          this.success = 'Role updated successfully';
          this.error = '';
        }
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to update role';
        this.success = '';
      }
    });
  }

  deleteRole(id: string): void {
    if (confirm('Are you sure you want to delete this role?')) {
      this.roleService.deleteRole(id).subscribe({
        next: (response) => {
          if (response.success) {
            this.roles = this.roles.filter(r => r._id !== id);
            this.success = 'Role deleted successfully';
            this.error = '';
          }
        },
        error: (error) => {
          this.error = error.error?.message || 'Failed to delete role';
          this.success = '';
        }
      });
    }
  }
} 