import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {
  router = inject(Router);
  authService = inject(AuthService);

  navigateTo(route: string) {
    if (route === 'login' && this.authService.isAuthenticated()) {
      const user = this.authService.getUser();
      this.router.navigate(['/user-profile', user._id]);
    } else {
      this.router.navigate([`/${route}`]);
    }
  }     
}
