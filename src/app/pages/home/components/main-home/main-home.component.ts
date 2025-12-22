import { Component } from '@angular/core'
import { EventCardComponent } from '../event-card/event-card.component'
import { NgForOf } from '@angular/common'
import { Evento } from '../../../models/main-model'
import { Router, RouterLink } from '@angular/router'

@Component({
  selector: 'app-main-home',
  imports: [
    EventCardComponent,
    NgForOf,
  ],
  templateUrl: './main-home.component.html',
  styleUrl: './main-home.component.scss',
})
export class MainHomeComponent {

  constructor(private router: Router) {

  }

  eventos: Evento[] = [
    {
      id: 'hatunphaway',
      titulo: 'BIENVENIDOS A LA SEGUNDA EDICIÓN DE LA GRAN CARRERA QOSQO 10K HATUN PHAWAY 2025',
      fecha: '2025',
      ubicacion: 'Cusco',
      capacidad: '+500 asistentes',
      categoria: 'Deporte',
      imagen: 'images/feliz.png',
      descripcion: 'Corre con amor, corre con propósito',
    },
    {
      id: 'bike',
      titulo: 'Bicicleteada Familiar\n' +
        '"Kuska Muyusunchis 2025"',
      fecha: '12 de Octubre, 2025',
      ubicacion: 'Plaza Mayor - Cusco',
      capacidad: '+500 asistentes',
      categoria: 'Deporte',
      imagen: 'bike/bike-ride.png',
      descripcion: 'Únete a esta gran jornada familiar donde el deporte se encuentra con la solidaridad. Pedalea con propósito y contribuye a una causa noble mientras creas recuerdos invaluables.',
    },
    {
      id: 'challenge-champions',
      titulo: 'Primer Campeonato Interescolar\n' +
        'Torneo Interescolar',
      fecha: '2025',
      ubicacion: 'Cusco',
      capacidad: '+50 participantes',
      categoria: 'Deporte',
      imagen: 'championship/logo1.png',
      descripcion: 'La competencia escolar más esperada del año donde las mejores instituciones educativas se enfrentan por el título de campeón absoluto. Deporte, disciplina y excelencia académica en un solo evento.  ',
    },
    {
      id: 'seminar',
      titulo: 'I Seminario sobre Gestión Deportiva',
      fecha: 'Diciembre, 2025',
      ubicacion: 'Ciudad del Cusco - Casa de la Cultura',
      capacidad: '+300 participantes',
      categoria: 'Educación',
      imagen: 'seminar/logo2.png',
      descripcion: 'Evento académico especializado para fortalecer las capacidades de gestión, planificación y liderazgo de los actores vinculados al ámbito deportivo en la región Cusco.',
    },
  ]

  onContact(): void {
    console.log('Contact button clicked')
    // Implementar lógica de contacto
  }

  scrollToEvents(): void {
    const eventosSection = document.getElementById('eventos')
    if (eventosSection) {
      eventosSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  onLearnMore(): void {
    console.log('Learn more clicked')
    // Navegar a página de información
  }

  viewAllEvents(): void {
    console.log('View all events clicked')
    // Navegar a página de todos los eventos
  }
}
