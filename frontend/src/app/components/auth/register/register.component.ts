import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { confirmPasswordValidator } from '../../../validators/confirmpassword.validator';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export default class RegisterComponent implements OnInit {
  router = inject(Router);
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  registerForm !: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: [confirmPasswordValidator('password', 'confirmPassword')]
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  onRegister(): void {
    console.log(this.registerForm.value);
    this.authService.registerService(this.registerForm.value)
    .subscribe( res =>{
      console.log(res);
        
        alert(res.message);
        this.registerForm.reset();
        this.router.navigate(['/login']);
    });
  }
} 
