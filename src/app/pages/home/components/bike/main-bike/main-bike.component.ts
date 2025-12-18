import { Component, Input } from '@angular/core'
import { GalleryBikeComponent } from '../gallery-bike/gallery-bike.component'
import { CorrouselBikeComponent } from '../corrousel-bike/corrousel-bike.component'
import { SponsorsBikeComponent } from '../sponsors-bike/sponsors-bike.component'
import { PortalBikeComponent } from '../portal-bike/portal-bike.component'

@Component({
  selector: 'app-main-bike',
  imports: [
    GalleryBikeComponent,
    CorrouselBikeComponent,
    SponsorsBikeComponent,
    PortalBikeComponent,
  ],
  templateUrl: './main-bike.component.html',
  styleUrl: './main-bike.component.scss'
})
export class MainBikeComponent {
@Input() typeSection: string = '';
}
