import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    // public routes
    {
        path: '',
        loadChildren: () => import('./pages/pages.routes').then((m) => m.pagesRoutes)
    },
    
    // private routes
    // {
    //     path: 'auth',
    //     loadChildren: () => import('./shared/shared.routes').then((m) => m.sharedRoutes)
    // },
    {
        path: '**',
        component: NotFoundComponent
    }
];

