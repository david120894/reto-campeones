import { Component } from '@angular/core';
import { DatepickerComponent } from '../partials/datepicker/datepicker.component';
import { ProfileComponent } from '../partials/profile/profile.component';

const NG_DECLARATIONS = [DatepickerComponent, ProfileComponent];

@Component({
  selector: 'app-userlayout',
  imports: [... NG_DECLARATIONS],
  templateUrl: './userlayout.component.html',
  styleUrl: './userlayout.component.scss'
})
export class UserlayoutComponent {

}
