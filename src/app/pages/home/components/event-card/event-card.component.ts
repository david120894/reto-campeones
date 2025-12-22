import { Component, Input } from '@angular/core'
import { Evento } from '../../../models/main-model'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-event-card',
  imports: [
    RouterLink,
  ],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {
  @Input() evento!: Evento;
  navigate() {
    window.open('https://hatunphaway.cusco.gob.pe', 'noopener,noreferrer')
  }
}
