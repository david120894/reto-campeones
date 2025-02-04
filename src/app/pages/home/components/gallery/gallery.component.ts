import { Component } from '@angular/core';
import { TitlesComponent } from '../titles/titles.component';

@Component({
  selector: 'app-gallery',
  imports: [
    TitlesComponent
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {

}
