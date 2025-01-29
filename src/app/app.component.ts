import { Component } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./shared/components/nav-bar/nav-bar.component";
import { FirstViewComponent } from "./sections/first-view/first-view.component";
import { ServicesComponent } from "./sections/services/services.component";
import { ServicesGalleryComponent } from "./sections/services-gallery/services-gallery.component";
import { ContactComponent } from "./sections/contact/contact.component";
import { AboutComponent } from "./sections/about/about.component";
import { FormComponent } from "./sections/form/form.component";
import { FooterComponent } from "./shared/components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, FirstViewComponent, ServicesComponent, ServicesGalleryComponent, ContactComponent, AboutComponent, ReactiveFormsModule, FormComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gdur';
}
