import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // If route has role requirements, check them
  if (route.data['roles']) {
    const user = authService.getUser();
    const requiredRoles = route.data['roles'];
    
    const hasRequiredRole = requiredRoles.some((role: string) => 
      user?.roles?.some((userRole: any) => userRole.role === role)
    );

    if (!hasRequiredRole) {
      router.navigate(['/unauthorized']);
      return false;
    }
  }

  return true;
}; 