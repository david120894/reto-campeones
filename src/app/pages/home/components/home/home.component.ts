import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core'
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
import { SectionGalleryComponent } from '../main-gallery/section-gallery/section-gallery.component'
import { HeaderComponent } from '../../../../core/components/header/header.component'
import { FooterComponent } from '../../../../core/components/footer/footer.component'
import { UsefulVacationsComponent } from '../seminar/useful-vacations/useful-vacations.component'
import { SeminarComponent } from '../seminar1/seminar/seminar.component'
import { ActivatedRoute } from '@angular/router'
const DECLARATIONS = [
  SectionHomeComponent, GalleryComponent, ContactComponent, CarrouselComponent, AboutComponent, FeaturesComponent,
]

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EmailFormComponent, FixtureComponent, NgParticlesModule, PresentationComponent, GalleryComponent, CarrouselComponent, AboutComponent, SectionHomeComponent, BracketComponent, SectionGalleryComponent, UsefulVacationsComponent, SeminarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  activaRouter = inject(ActivatedRoute)
  sectionChangedValue: string = '';
  ngOnInit() {
    const params = this.activaRouter.snapshot.params['id']
    this.onSectionChanged(params? params : 1)
  }

  onSectionChanged(newSection: string) {
    if (newSection!== '') {
      this.sectionChangedValue = newSection;

    }else {
      this.sectionChangedValue = 'bike-ride';
    }
  }
}
