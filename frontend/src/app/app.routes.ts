import { Routes } from '@angular/router';
import HomeComponent from './components/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoggedInGuard } from './core/guards/logged-in.guard';

// import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    {
        path: 'login',
        loadComponent: () => import('./components/auth/login/login.component'),
        canActivate: [LoggedInGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./components/auth/register/register.component'),
        canActivate: [LoggedInGuard]
    },
    {
        path: 'user-profile/:id',
        loadComponent: () => import('./components/user-profile/user-profile.component'),
        canActivate: [AuthGuard]
    },
    {
        path: 'edit-profile/:id',
        loadComponent: () => import('./components/user-profile/edit-profile/edit-profile.component'),
        canActivate: [AuthGuard]
    },
    {
        path: 'create-post',
        loadComponent: () => import('./components/posts/create-post/create-post.component'),
        canActivate: [AuthGuard]
    },
    {
        path: 'values',
        loadComponent: () => import('./components/shared/values/values.component')
    },
    {
        path: 'leaders',
        loadComponent: () => import('./components/shared/leaders/leaders.component')
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./components/auth/forget-password/forget-password.component'),
        canActivate: [LoggedInGuard]
    },
    {
        path: 'reset/:token',
        loadComponent: () => import('./components/auth/reset/reset.component'),
        canActivate: [LoggedInGuard]
    },
    {
        path: 'admin-dashboard',
        loadComponent: () => import('./components/admin/dashboard/dashboard.component'),
        canActivate: [AuthGuard]
    },
    { path: '**', redirectTo: 'home' }
];
