import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { SectionHomeComponent } from './components/section-home/section-home.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { EmailFormComponent } from './components/email-form/email-form.component';
import { ContactComponent } from './components/contact/contact.component';
import { CarrouselComponent } from './components/carrousel/carrousel.component';
import { AboutComponent } from './components/about/about.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeComponent,
    SectionHomeComponent,
    GalleryComponent,
    EmailFormComponent,
    ContactComponent,
    CarrouselComponent,
    AboutComponent
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
