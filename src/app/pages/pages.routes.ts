import { Routes } from '@angular/router'
import { NewRegisterComponent } from './new-register/new-register.component'
import { LoginComponent } from './login/login.component'
import { UserRegisterComponent } from './home/components/user-register/user-register.component'
import { LotteryMachineComponent } from './dashboard/components/aside/lottery/lottery-machine/lottery-machine.component'
import { RaffleComponent } from './dashboard/components/aside/raffle/raffle.component'
import {
  SeminarRegistrationFormComponent,
} from './home/components/seminar1/seminar-registration-form/seminar-registration-form.component'
import { PagesComponent } from './pages.component'
import {
  SeminarAttendanceComponent
} from './dashboard/components/aside/seminar-attendance/seminar-attendance.component'
import { EmailFormComponent } from './home/components/reto/email-form/email-form.component'


export const pagesRoutes: Routes = [
  // first screen to any poeple
  {
    path: '',
    loadComponent: () => import('./pages.component').then((m) => m.PagesComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./home/components/home/home.component').then((m) => m.HomeComponent),
      },
    ],
  },
  {
    path:'main/:id',
    loadComponent: () => import('./pages.component').then((m) => m.PagesComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./home/components/home/home.component').then((m) => m.HomeComponent),
      },
    ],
  },
  {
    path: 'register',
    component: EmailFormComponent,
  },
  {
    path: 'user-register',
    component: UserRegisterComponent,
  },
  {
    path: 'seminar-register',
    component: SeminarRegistrationFormComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'raffle',
    component: RaffleComponent,
  },
  {
    path: 'raffle2',
    component: LotteryMachineComponent,
  },
]
