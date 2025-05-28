import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { emailValidator } from '../../../validators/email.validator';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})

export default class ForgetPasswordComponent {
  router = inject(Router);
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  forgetPasswordForm !: FormGroup;

  ngOnInit(): void {
    this.forgetPasswordForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    },
    {
      validators: [emailValidator('email')]
    }
  );
  }

  onSendEmail(): void {
    console.log(this.forgetPasswordForm.value);
    alert('Email sent');
  }


  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
