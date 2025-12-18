import { Component, Input } from '@angular/core'
import { PresentationComponent } from '../presentation/presentation.component'
import { SectionGalleryComponent } from '../../main-gallery/section-gallery/section-gallery.component'
import { BracketComponent } from '../bracket/bracket.component'
import { GalleryRetoComponent } from '../gallery-reto/gallery-reto.component'
import { FixtureComponent } from '../fixture/fixture.component'
import { CarrouselRetoComponent } from '../carrousel-reto/carrousel-reto.component'
import { EmailFormComponent } from '../email-form/email-form.component'
import { SponsorsRetoComponent } from '../sponsors-reto/sponsors-reto.component'
import { PortalComponent } from '../portal/portal.component'

@Component({
  selector: 'app-main-reto',
  imports: [
    PresentationComponent,
    SectionGalleryComponent,
    BracketComponent,
    GalleryRetoComponent,
    FixtureComponent,
    CarrouselRetoComponent,
    EmailFormComponent,
    SponsorsRetoComponent,
    PortalComponent,
    PortalComponent,
  ],
  templateUrl: './main-reto.component.html',
  styleUrl: './main-reto.component.scss'
})
export class MainRetoComponent {
}
