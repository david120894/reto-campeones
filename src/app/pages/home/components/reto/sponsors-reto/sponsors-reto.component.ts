import { Component, Input, OnInit, SimpleChanges } from '@angular/core'
import { initFlowbite } from 'flowbite'

@Component({
  selector: 'app-sponsors-reto',
  imports: [],
  templateUrl: './sponsors-reto.component.html',
  styleUrl: './sponsors-reto.component.scss'
})
export class SponsorsRetoComponent implements OnInit {

  ngOnInit(): void {
    initFlowbite();
    this.initFutbol();
  }
  initFutbol() {

  }
  images = [
    'bike/ruta1.jpg',
    'bike/ruta2.jpg'
  ];

  currentIndex = 0;

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}
