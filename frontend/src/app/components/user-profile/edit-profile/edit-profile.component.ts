import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
})
export default class EditProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  editForm!: FormGroup;
  userId: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  profileImage: string = '';
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  ngOnInit(): void {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.loadUserData();
    });
  }

  loadUserData(): void {
    this.authService.getUserById(this.userId).subscribe({
      next: (response) => {
        if (response.success) {
          const userData = response.data;
          this.editForm.patchValue({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email
          });
          this.profileImage = userData.profileImage;
          this.previewUrl = userData.profileImage;
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Error loading user data';
      }
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = 'File size should not exceed 5MB';
        return;
      }

      // Check file type
      if (!file.type.match(/^image\/(jpg|jpeg|png|gif)$/)) {
        this.errorMessage = 'Only JPG, JPEG, PNG & GIF files are allowed';
        return;
      }

      this.selectedFile = file;
      this.errorMessage = '';

      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = new FormData();
    formData.append('firstName', this.editForm.get('firstName')?.value);
    formData.append('lastName', this.editForm.get('lastName')?.value);
    formData.append('email', this.editForm.get('email')?.value);
    
    if (this.selectedFile) {
      formData.append('profileImage', this.selectedFile);
    }

    this.authService.updateProfile(this.userId, formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.successMessage = 'Profile updated successfully!';
          setTimeout(() => {
            this.router.navigate(['/user-profile', this.userId]);
          }, 1500);
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Error updating profile';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/user-profile', this.userId]);
  }
} 