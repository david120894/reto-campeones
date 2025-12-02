import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgForOf } from '@angular/common'

interface Sponsor {
  name: string;
  logo: string;
  url?: string;
  category: string;
}

@Component({
  selector: 'app-sponsors',
  imports: [
    NgForOf
  ],
  templateUrl: './sponsors.component.html',
  styleUrl: './sponsors.component.scss'
})

export class SponsorsComponent implements OnInit, OnDestroy{
  currentIndex = 0;
  autoPlay = true;
  private autoPlayInterval: any;

  // Datos de ejemplo - reemplaza con tu data real
  allSponsors: Sponsor[] = [
    {
      name: 'Casa de la Cultura Cusco',
      logo: '/seminar/cc.png',
      url: 'https://sponsor1.com',
      category: ''
    },
    {
      name: 'Municipalidad Pronvicial del Cusco',
      logo: '/seminar/muni_cusco.jpg',
      url: 'https://sponsor2.com',
      category: ''
    },
    {
      name: 'Proyecto Cusco Deportes',
      logo: '/seminar/pcd.jpg',
      url: 'https://sponsor3.com',
      category: ''
    },
    {
      name: 'QOSQO Hatun Llaqta',
      logo: '/seminar/qosqo.jpg',
      url: 'https://sponsor3.com',
      category: ''
    },
    {
      name: 'UGEL',
      logo: '/seminar/ugel.jpg',
      url: 'https://sponsor3.com',
      category: '',
    },
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
      }, 2000);
    }
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  goToPrevious() {
    this.autoPlay = true;
    this.currentIndex = (this.currentIndex - 1 + this.allSponsors.length) % this.allSponsors.length;
    this.startAutoPlay();
  }

  goToNext() {
    this.autoPlay = true;
    this.currentIndex = (this.currentIndex + 1) % this.allSponsors.length;
    this.startAutoPlay();
  }

  goToSlide(idx: number) {
    this.currentIndex = idx;
    this.autoPlay = true;
    this.startAutoPlay();
  }

  get currentSponsor(): Sponsor {
    return this.allSponsors[this.currentIndex];
  }
}
