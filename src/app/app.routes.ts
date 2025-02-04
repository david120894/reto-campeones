import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/components/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/components/login/login.component';
import { RegisterComponent } from './pages/register/components/register/register.component';
import { HomeComponent } from './pages/home/components/home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
];  

