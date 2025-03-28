import { Routes } from '@angular/router';


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
];