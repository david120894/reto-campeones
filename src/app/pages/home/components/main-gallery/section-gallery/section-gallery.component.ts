import { Component, Input } from '@angular/core'
import { GalleryComponent } from '../../reto/gallery/gallery.component'

@Component({
  selector: 'app-section-gallery',
  imports: [
    GalleryComponent,
  ],
  templateUrl: './section-gallery.component.html',
  styleUrl: './section-gallery.component.scss'
})
export class SectionGalleryComponent {
  @Input() typeSection!: string;
}
