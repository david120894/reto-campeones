import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core'
import { NgParticlesModule } from 'ng-particles';

import { SectionHomeComponent } from '../section-home/section-home.component';
import { SectionGalleryComponent } from '../main-gallery/section-gallery/section-gallery.component'
import { HeaderComponent } from '../../../../core/components/header/header.component'
import { FooterComponent } from '../../../../core/components/footer/footer.component'
import { UsefulVacationsComponent } from '../seminar/useful-vacations/useful-vacations.component'
import { SeminarComponent } from '../seminar1/seminar/seminar.component'
import { ActivatedRoute } from '@angular/router'
import { MainRetoComponent } from '../reto/main-reto/main-reto.component'
import { MainBikeComponent } from '../bike/main-bike/main-bike.component'
const DECLARATIONS = [
  SectionHomeComponent
]

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgParticlesModule, SectionHomeComponent, SectionGalleryComponent, UsefulVacationsComponent, SeminarComponent, MainRetoComponent, MainBikeComponent],
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
