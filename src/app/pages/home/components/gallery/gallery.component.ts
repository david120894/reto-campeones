import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
export class GalleryComponent implements OnInit, AfterViewInit {
  @Input() typeSection!: string;


  places: Place[] = [];

  constructor(private placeService: PlaceService) {}
  @ViewChild('videoPlayer3') videoPlayer3!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

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

  ngAfterViewInit() {
    const video = this.videoPlayer3.nativeElement;
    const video2 = this.videoPlayer.nativeElement;
    video2.autoplay = true;
    video2.defaultMuted = true;
    video.defaultMuted = true;  // 👈 fuerza el mute desde el inicio
    video.muted = true;
    video.volume = 0;
    video.play().catch(err => {
      console.warn("No se pudo reproducir automáticamente:", err);
    });

    video2.play().catch(err => {
      console.warn("No se pudo reproducir automáticamente:", err);
    });

  }
}
