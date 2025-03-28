import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';
import { adminGuard } from '../core/guards/admin.guard';

export const sharedRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared.component').then((m) => m.SharedComponent),
        children:[
            {
                path: '',
                loadComponent:() => import('../pages/login/login.component').then((m) => m.LoginComponent)
            },
            {
                path: 'login',
                loadComponent:() => import('../pages/login/login.component').then((m) => m.LoginComponent)
            },
            {
                path: 'register',
                loadComponent: () => import('../pages/register/register.component').then((m)  => m.RegisterComponent),
            },
        ],
    },
    {
        //any user logged
        path: 'dashboard',
        loadComponent:() => import('../pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
        canActivate: [authGuard],
        children:[
            {
                path: '',
                loadComponent: () => import('../pages/dashboard/components/adminlayout/adminlayout.component').then((m)=> m.AdminlayoutComponent)
            },
            {
                path: 'notifications',
                loadComponent: () => import('../pages/dashboard/components/aside/notifications/notifications.component').then((m)=> m.NotificationsComponent)
            },
            {
                path: 'users',
                loadComponent: () => import('../pages/dashboard/components/aside/users/users.component').then((m)=> m.UsersComponent),
                canActivate: [adminGuard],
            },
            {
                path: 'reserves',
                loadComponent: () => import('../pages/dashboard/components/aside/reserves/reserves.component').then((m)=> m.ReservesComponent),
            },
            {
                path: 'places',
                loadComponent: () => import('../pages/dashboard/components/aside/places/places.component').then((m)=> m.PlacesComponent),
                canActivate: [adminGuard],
            }
        ]
    }
];