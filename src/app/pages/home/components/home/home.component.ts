import { Component } from '@angular/core';
import { NgParticlesModule } from 'ng-particles';

import { SectionHomeComponent } from '../section-home/section-home.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { EmailFormComponent } from '../email-form/email-form.component';
import { ContactComponent } from '../contact/contact.component';
import { CarrouselComponent } from '../carrousel/carrousel.component';
import { AboutComponent } from '../about/about.component';
import { FeaturesComponent } from '../features/features.component';
import { GalleryInterNeighborhoodComponent } from '../gallery-inter-neighborhood/gallery-inter-neighborhood.component'
import { LlamaSceneComponent } from '../llama-scene/llama-scene.component'
import { FixtureComponent } from '../fixture/fixture.component'

const DECLARATIONS = [
  SectionHomeComponent, GalleryComponent, ContactComponent, CarrouselComponent, AboutComponent, FeaturesComponent,
]

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [...DECLARATIONS, GalleryInterNeighborhoodComponent, EmailFormComponent, LlamaSceneComponent, FixtureComponent, NgParticlesModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']   // ✅ corregido
})
export class HomeComponent {
}
