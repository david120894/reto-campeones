import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { Place } from '../../../../../core/models'
import { PlaceService } from '../../../../../core/services/place.service'

@Component({
  selector: 'app-gallery-reto',
  imports: [],
  templateUrl: './gallery-reto.component.html',
  styleUrl: './gallery-reto.component.scss'
})
export class GalleryRetoComponent implements OnInit {
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
