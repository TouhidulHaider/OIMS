import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Check if user is logged in by verifying token
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // If route has role requirements, check them
//   if (route.data['roles']) {
//     const userRoles = JSON.parse(localStorage.getItem('roles') || '[]');
//     const requiredRoles = route.data['roles'];
    
//     const hasRequiredRole = requiredRoles.some((role: string) => 
//       userRoles.includes(role)
//     );

//     if (!hasRequiredRole) {
//       router.navigate(['/unauthorized']);
//       return false;
//     }
//   }

  return true;
}; 