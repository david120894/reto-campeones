import { Component, OnDestroy, OnInit } from '@angular/core'
import { EventCardComponent } from '../event-card/event-card.component'
import { NgForOf } from '@angular/common'
import { Evento, Photo } from '../../../models/main-model'
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
export class MainHomeComponent implements OnInit, OnDestroy {

  currentSlide: number = 0
  fotosPerSlide: number = 3
  totalSlides: number = 0
  slides: number[] = []
  currentPhotos: Photo[] = []

  galeriaFotos: Photo[] = []

  eventos: Evento[] = [
    {
      id: 'hatunphaway',
      titulo: 'BIENVENIDOS A LA SEGUNDA EDICIÓN DE LA GRAN CARRERA QOSQO 10K HATUN PHAWAY 2025',
      fecha: '2025',
      ubicacion: 'Cusco',
      capacidad: '+500 asistentes',
      categoria: 'Deporte',
      imagen: 'images/feliz.png',
      qr:'qr/qr-hatunphaway.png',
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
      qr:'qr/qr_bikeride.png',
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
      qr:'qr/qr-reto.png',
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
      qr:'qr/seminar.png',
      descripcion: 'Evento académico especializado para fortalecer las capacidades de gestión, planificación y liderazgo de los actores vinculados al ámbito deportivo en la región Cusco.',
    },
  ]

  private intervalId: any

  ngOnInit(): void {

    this.getPhoto()
  }

  getPhoto() {
    Array.from({ length: 23 }).forEach((photo, index) => {
      this.galeriaFotos.push({src:`https://taqe.cusco.gob.pe/publico/web/campeonato/proyectocuscodeportes/${index +1}.jpg`})
    })
    this.calculateSlides()
    this.updateCurrentPhotos()
    this.startAutoSlide()
    console.log(this.galeriaFotos)
  }

  ngOnDestroy(): void {
    this.stopAutoSlide()
  }

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

  private calculateSlides(): void {
    this.totalSlides = Math.ceil(this.galeriaFotos.length / this.fotosPerSlide)
    this.slides = Array.from({ length: this.totalSlides }, (_, i) => i)
  }

  private updateCurrentPhotos(): void {
    const start = this.currentSlide * this.fotosPerSlide
    const end = start + this.fotosPerSlide
    this.currentPhotos = this.galeriaFotos.slice(start, end)
  }

  goToSlide(slideIndex: number): void {
    this.currentSlide = slideIndex
    this.updateCurrentPhotos()
    this.restartAutoSlide()
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides
    this.updateCurrentPhotos()
  }

  previousSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides
    this.updateCurrentPhotos()
  }

  private startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide()
    }, 4000)
  }

  private stopAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  private restartAutoSlide(): void {
    this.stopAutoSlide()
    this.startAutoSlide()
  }

  viewFullGallery(): void {
    console.log('Ver galería completa')
    // Aquí podrías navegar a una página de galería completa
    // this.router.navigate(['/galeria']);
  }
}
