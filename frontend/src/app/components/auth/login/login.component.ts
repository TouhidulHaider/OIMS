import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})

export default class LoginComponent {
  router = inject(Router);
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  loginForm !: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],  
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.loginService(this.loginForm.value)
    .subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(['/user-profile', res.data.user._id]);
          this.loginForm.reset();
        } else {
          this.errorMessage = res.message || 'Login failed';
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'An error occurred during login';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
