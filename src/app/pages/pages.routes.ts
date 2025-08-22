import { Routes } from '@angular/router';
import { NewRegisterComponent } from './new-register/new-register.component';
import { EmailFormComponent } from './home/components/email-form/email-form.component';
import { LoginComponent } from './login/login.component';
import { RaffleComponent } from './home/components/raffle/raffle.component'


export const pagesRoutes: Routes = [
    // first screen to any poeple
    {
        path: '',
        loadComponent: () => import('./pages.component').then((m) => m.PagesComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./home/components/home/home.component').then((m) => m.HomeComponent),
            }
        ]
    },
  {
    path: 'register',
    component:EmailFormComponent
  },
  // {
  //   path: 'landing',
  //   component:LandingComponent
  // },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path:'raffle',
    component:RaffleComponent
  }
];
