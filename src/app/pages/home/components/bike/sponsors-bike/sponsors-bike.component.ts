import { Component, Input, OnInit, SimpleChanges } from '@angular/core'
import { initFlowbite } from 'flowbite'

@Component({
  selector: 'app-sponsors-bike',
  imports: [],
  templateUrl: './sponsors-bike.component.html',
  styleUrl: './sponsors-bike.component.scss'
})
export class SponsorsBikeComponent implements OnInit {

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

}
