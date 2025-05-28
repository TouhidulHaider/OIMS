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
      console.log(res);
      alert(res.message);
      this.loginForm.reset();
      this.router.navigate(['/user-profile']);
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
