import { Component, OnInit } from '@angular/core';

import { TitlesComponent } from '../titles/titles.component';
import { initFlowbite } from 'flowbite';
import { NgClass, NgForOf } from '@angular/common'

const DECLATAIONS = [TitlesComponent];



@Component({
  selector: 'app-about',
  imports: [
    NgForOf,
    NgClass,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit{

  ngOnInit(): void {
    initFlowbite();
    this.initFutbol();
  }
  initFutbol() {

  }


}
