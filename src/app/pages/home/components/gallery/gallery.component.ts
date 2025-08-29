import { Component, OnInit } from '@angular/core';
import { TitlesComponent } from '../titles/titles.component';
import { Place } from '../../../../core/models/place';
import { PlaceService } from '../../../../core/services/place.service';
import { CommonModule } from '@angular/common';

const NG_DECLARATIONS = [TitlesComponent];
const NG_MODULES = [CommonModule];

@Component({
  selector: 'app-gallery',
  imports: [...NG_MODULES],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  places: Place[] = [];

  constructor(private placeService: PlaceService) {}

  ngOnInit(): void {
    this.placeService.getPlaces().subscribe((data) => {
      this.places = data;
    });
  }

  scrollToEmail() {
    const emailSection = document.getElementById('email');
    if (emailSection) {
      emailSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
