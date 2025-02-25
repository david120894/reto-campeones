import { Component } from '@angular/core';
import { HeaderComponent } from "../core/components/header/header.component";
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../core/components/footer/footer.component';

const NG_MODULES = [RouterModule];
const DECLARATIONS = [HeaderComponent, FooterComponent];

@Component({
  selector: 'app-pages',
  imports: [...NG_MODULES, ...DECLARATIONS],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent {

}
