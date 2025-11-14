import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgParticlesModule } from 'ng-particles';

import { SectionHomeComponent } from '../section-home/section-home.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { EmailFormComponent } from '../email-form/email-form.component';
import { ContactComponent } from '../contact/contact.component';
import { CarrouselComponent } from '../carrousel/carrousel.component';
import { AboutComponent } from '../about/about.component';
import { FeaturesComponent } from '../features/features.component';
import { FixtureComponent } from '../fixture/fixture.component'
import { PresentationComponent } from '../presentation/presentation.component'
import { BracketComponent } from '../bracket/bracket.component'

const DECLARATIONS = [
  SectionHomeComponent, GalleryComponent, ContactComponent, CarrouselComponent, AboutComponent, FeaturesComponent,
]

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EmailFormComponent, FixtureComponent, NgParticlesModule, PresentationComponent, GalleryComponent, CarrouselComponent, AboutComponent, SectionHomeComponent, BracketComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  sectionChangedValue: string = '';
  ngOnInit() {
  }

  onSectionChanged(newSection: string) {
    this.sectionChangedValue = newSection;
  }
}
