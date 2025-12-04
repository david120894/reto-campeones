import { Component } from '@angular/core';
import { NgForOf } from '@angular/common'

@Component({
  selector: 'app-footer',
  imports: [
    NgForOf,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  socialNetworks = ['facebook', 'instagram', 'twitter'];
}
