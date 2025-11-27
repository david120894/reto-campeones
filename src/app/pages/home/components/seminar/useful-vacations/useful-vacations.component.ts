import { Component } from '@angular/core';
import { CoursesComponent } from '../courses/courses.component'
import { FeaturesComponent } from '../features/features.component'
import { RegistrationComponent } from '../registration/registration.component'

@Component({
  selector: 'app-useful-vacations',
  imports: [
    CoursesComponent,
    FeaturesComponent,
    RegistrationComponent,
  ],
  templateUrl: './useful-vacations.component.html',
  styleUrl: './useful-vacations.component.scss'
})
export class UsefulVacationsComponent {

}
