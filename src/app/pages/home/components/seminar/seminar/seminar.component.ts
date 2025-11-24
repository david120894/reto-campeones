import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component'
import { HeroComponent } from '../hero/hero.component'
import { CoursesComponent } from '../courses/courses.component'
import { FeaturesComponent } from '../features/features.component'
import { RegistrationComponent } from '../registration/registration.component'
import { FooterComponent } from '../footer/footer.component'

@Component({
  selector: 'app-seminar',
  imports: [
    HeaderComponent,
    HeroComponent,
    CoursesComponent,
    FeaturesComponent,
    RegistrationComponent,
    FooterComponent,
  ],
  templateUrl: './seminar.component.html',
  styleUrl: './seminar.component.scss'
})
export class SeminarComponent {

}
