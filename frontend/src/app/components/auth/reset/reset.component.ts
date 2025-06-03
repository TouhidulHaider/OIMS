import { Component, inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-reset',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export default class ResetComponent implements OnInit {
  resetForm !: FormGroup;

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  token!: string;

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required]],
    });

    this.activatedRoute.params.subscribe((val) => {
      this.token = val['token'];
      console.log(this.token);
    });
  }
  
  onReset() {
    if (this.resetForm.valid) {
      this.authService.resetPassword(this.token, this.resetForm.value.newPassword!).subscribe((res) => {
        alert("Password reset successfully!");
        this.router.navigate(['/login']);
      });
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

}
