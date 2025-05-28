import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
        <p class="text-gray-600 mb-8">You don't have permission to access this page.</p>
        <a routerLink="/home" class="text-blue-600 hover:text-blue-800">Return to Home</a>
      </div>
    </div>
  `
})
export class UnauthorizedComponent {} 