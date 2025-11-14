import { Routes } from '@angular/router';

export const routes: Routes = [
    // public routes
    {
        path: '',
        loadChildren: () => import('./pages/pages.routes').then((m) => m.pagesRoutes)
    },
    // private routes
    {
        path: 'auth',
        loadChildren: () => import('./shared/shared.routes').then((m) => m.sharedRoutes)
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
