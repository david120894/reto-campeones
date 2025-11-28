import { Component } from '@angular/core';
import { NgForOf } from '@angular/common'

@Component({
  selector: 'app-sponsors',
  imports: [
    NgForOf,
  ],
  templateUrl: './sponsors.component.html',
  styleUrl: './sponsors.component.scss'
})
interface Sponsor {
  name: string;
  logo: string;
  url?: string;
  category: string;
}
export class SponsorsComponent {
  currentIndex = 0;
  autoPlay = true;
  private autoPlayInterval: any;

  // Datos de ejemplo - reemplaza con tu data real
  allSponsors: Sponsor[] = [
    {
      name: 'Sponsor 1',
      logo: '/assets/images/sponsor1.png',
      url: 'https://sponsor1.com',
      category: 'principal'
    },
    {
      name: 'Sponsor 2',
      logo: '/assets/images/sponsor2.png',
      url: 'https://sponsor2.com',
      category: 'secundario'
    },
    {
      name: 'Sponsor 3',
      logo: '/assets/images/sponsor3.png',
      url: 'https://sponsor3.com',
      category: 'terciario'
    }
    // Agrega más auspiciadores según necesites
  ];

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.stopAutoPlay();
    if (this.autoPlay) {
      this.autoPlayInterval = setInterval(() => {
        this.goToNext();
      }, 4000);
    }
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  goToPrevious() {
    this.autoPlay = false;
    this.currentIndex = (this.currentIndex - 1 + this.allSponsors.length) % this.allSponsors.length;
    this.startAutoPlay();
  }

  goToNext() {
    this.autoPlay = false;
    this.currentIndex = (this.currentIndex + 1) % this.allSponsors.length;
    this.startAutoPlay();
  }

  goToSlide(idx: number) {
    this.currentIndex = idx;
    this.autoPlay = false;
    this.startAutoPlay();
  }

  get currentSponsor(): Sponsor {
    return this.allSponsors[this.currentIndex];
  }
}
