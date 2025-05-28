import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Create New Post</h2>
          
          <form [formGroup]="postForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Title -->
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" id="title" formControlName="title"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <!-- Content -->
            <div>
              <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
              <textarea id="content" formControlName="content" rows="6"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
            </div>

            <!-- Image URL -->
            <div>
              <label for="imageUrl" class="block text-sm font-medium text-gray-700">Image URL (optional)</label>
              <input type="text" id="imageUrl" formControlName="imageUrl"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end space-x-4">
              <button type="button" (click)="goBack()"
                      class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" [disabled]="!postForm.valid"
                      class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50">
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export default class CreatePostComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  postForm: FormGroup;

  constructor() {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['']
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      // TODO: Implement create post service
      console.log('Form submitted:', this.postForm.value);
      this.router.navigate(['/home']);
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
} 