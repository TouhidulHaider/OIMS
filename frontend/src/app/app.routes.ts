import { Routes } from '@angular/router';
import HomeComponent from './components/home/home.component';
// import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    {
        path: 'login',
        loadComponent: () => import('./components/auth/login/login.component')
    },
    {
        path: 'register',
        loadComponent: () => import('./components/auth/register/register.component')
    },
    {
        path: 'user-profile',
        loadComponent: () => import('./components/user-profile/user-profile.component')
        // canActivate: [AuthGuard]
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./components/auth/forget-password/forget-password.component')
    },
    { path: '**', redirectTo: 'home' }
];
