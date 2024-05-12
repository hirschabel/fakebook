import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'signup', loadComponent: () => import('./signup/signup.component').then((c) => c.SignupComponent) },
    { path: 'login', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent) },
    { path: 'user-management', loadComponent: () => import('./user-management/user-management.component').then((c) => c.UserManagementComponent), canActivate: [authGuard] },
    { path: 'home',  loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent), canActivate: [authGuard] },
    { path: 'friends',  loadComponent: () => import('./friends/friends.component').then((c) => c.FriendsComponent), canActivate: [authGuard] },
    { path: '**', redirectTo: 'home' }
];
