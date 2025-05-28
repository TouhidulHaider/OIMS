import { Routes } from '@angular/router';
import HomeComponent from './components/home/home.component';
import ResetPasswordComponent from './components/auth/reset/reset.component';
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
        path: 'user-profile/:id',
        loadComponent: () => import('./components/user-profile/user-profile.component')
        // canActivate: [AuthGuard]
    },
    {
        path: 'edit-profile/:id',
        loadComponent: () => import('./components/user-profile/edit-profile/edit-profile.component')
        // canActivate: [AuthGuard]
    },
    {
        path: 'create-post',
        loadComponent: () => import('./components/posts/create-post/create-post.component')
        // canActivate: [AuthGuard]
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
        loadComponent: () => import('./components/auth/forget-password/forget-password.component')
    },
    {
        path: 'reset/:token',
        loadComponent: () => import('./components/auth/reset/reset.component')
    },
    { path: '**', redirectTo: 'home' }
];
