import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component'
import { ObjectivesComponent } from '../objectives/objectives.component'
import { ModulesComponent } from '../modules/modules.component'
import { ScheduleComponent } from '../schedule/schedule.component'
import { TargetAudienceComponent } from '../target-audience/target-audience.component'
import { SeminarRegistrationFormComponent } from '../seminar-registration-form/seminar-registration-form.component'
import { SponsorsComponent } from '../sponsors/sponsors.component'

@Component({
  selector: 'app-seminar',
  imports: [
    ObjectivesComponent,
    ModulesComponent,
    ScheduleComponent,
    TargetAudienceComponent,
    SponsorsComponent,
  ],
  templateUrl: './seminar.component.html',
  styleUrl: './seminar.component.scss'
})
export class SeminarComponent {

}
