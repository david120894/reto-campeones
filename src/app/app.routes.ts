import { Routes } from '@angular/router';
import { ProfileComponent } from './pages/dashboard/components/partials/profile/profile.component'
import { RaffleComponent } from './pages/dashboard/components/aside/raffle/raffle.component'

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
    path: 'raffle',
    component: RaffleComponent,
  },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
