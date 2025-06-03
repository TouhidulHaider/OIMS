import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export default class UserProfileComponent {
  userId = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(AuthService);
  userData: any;

  ngOnInit(): void {
    this.userId.params.subscribe(params => {
      const id = params['id'];
      this.authService.getUserById(id).subscribe(response => {
        this.userData = response.data;
        console.log('User data:', this.userData);
      });
    });
  }

  editProfile(): void {
    // Navigate to edit profile page
    this.router.navigate(['/edit-profile', this.userData._id]);
  }

  createPost(): void {
    // Navigate to create post page
    this.router.navigate(['/create-post']);
  }

  navigateToDashboard(): void {
    this.router.navigate(['/admin-dashboard']);
  }

  getRoleNames(): string {
    if (!this.userData?.roles) return '';
    return this.userData.roles.map((role: any) => role.role).join(', ');
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        // Navigation is handled in the auth service
      },
      error: (error) => {
        console.error('Logout error:', error);
        // Force logout even if the server request fails
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      }
    });
  }
}
