import { Component } from '@angular/core';
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-header',
  imports: [
    NgIf,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
