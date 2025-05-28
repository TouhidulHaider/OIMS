import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>
          
          <form [formGroup]="editForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- First Name -->
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
              <input type="text" id="firstName" formControlName="firstName"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <!-- Last Name -->
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" id="lastName" formControlName="lastName"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" formControlName="email"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <!-- Profile Image -->
            <div>
              <label for="profileImage" class="block text-sm font-medium text-gray-700">Profile Image URL</label>
              <input type="text" id="profileImage" formControlName="profileImage"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end space-x-4">
              <button type="button" (click)="goBack()"
                      class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" [disabled]="!editForm.valid"
                      class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export default class EditProfileComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  editForm: FormGroup;
  userId: string;

  constructor() {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profileImage: ['']
    });

    this.userId = this.route.snapshot.params['id'];
    this.loadUserData();
  }

  loadUserData(): void {
    this.authService.getUserById(this.userId).subscribe(response => {
      if (response.data) {
        this.editForm.patchValue({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          profileImage: response.data.profileImage
        });
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      // TODO: Implement update profile service
      console.log('Form submitted:', this.editForm.value);
      this.router.navigate(['/user-profile', this.userId]);
    }
  }

  goBack(): void {
    this.router.navigate(['/user-profile', this.userId]);
  }
} 