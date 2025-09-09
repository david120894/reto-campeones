import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { TitlesComponent } from '../titles/titles.component';
import { initFlowbite } from 'flowbite';
import { NgClass, NgForOf, NgIf } from '@angular/common'

const DECLATAIONS = [TitlesComponent];



@Component({
  selector: 'app-about',
  imports: [
    NgIf,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, OnChanges{
  @Input() typeSection!: string;
  inputTitle=''
  ngOnChanges(changes: SimpleChanges) {
    if (changes['typeSection']) {
      this.inputTitle = changes['typeSection'].currentValue;
    }
  }


  ngOnInit(): void {
    initFlowbite();
    this.initFutbol();
  }
  initFutbol() {

  }


}
