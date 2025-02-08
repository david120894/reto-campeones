import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

const NG_MODULES = [RouterLink, RouterLinkActive];

@Component({
  selector: 'app-nav',
  imports: [...NG_MODULES],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

}
