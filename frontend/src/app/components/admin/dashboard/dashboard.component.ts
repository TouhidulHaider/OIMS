import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent implements OnInit {
  users: User[] = [];
  router = inject(Router);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getAllUsers().subscribe({
      next: (response) => {
        if (response.success) {
          this.users = response.data;
        }
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  getAdminCount(): number {
    return this.users.filter(user => user.isAdmin).length;
  }

  viewProfile(userId: string): void {
    this.router.navigate(['/user-profile', userId]);
  }

  // editProfile(userId: string): void {
  //   this.router.navigate(['/edit-profile', userId]); 
  // }
}
