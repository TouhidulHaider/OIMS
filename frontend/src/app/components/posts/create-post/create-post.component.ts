import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
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