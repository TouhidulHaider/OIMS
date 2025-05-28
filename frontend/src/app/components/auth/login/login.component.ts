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

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],  
    });
  }

  onLogin(): void {
    console.log(this.loginForm.value);
    this.authService.loginService(this.loginForm.value)
    .subscribe( res =>{
      console.log('Login response:', res);
      if (res.success) {
        alert(res.message);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        this.router.navigate(['/user-profile', res.data.user._id]);
        this.loginForm.reset();
      } else {
        alert('Login failed: ' + res.message);
      }
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
