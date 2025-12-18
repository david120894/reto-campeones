import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
  ViewChild,
} from '@angular/core'
import { DatePipe, NgForOf, NgIf } from '@angular/common'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { ResponseRegisterModels } from '../../../../../core/models/response.register.models'
import { ReservationService } from '../../../../../core/services/reservation.service'
import html2canvas from 'html2canvas'

@Component({
  selector: 'app-portal',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
  ],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss',
})
export class PortalComponent implements AfterViewInit, OnInit {

  loading = signal(false)
  router = inject(Router)
  activaRouter = inject(ActivatedRoute)
  @Output() sectionChanged = new EventEmitter<string>()

  constructor() {
  }

  ngOnInit() {
    const params = this.activaRouter.snapshot.params['id']
  }

  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>
  @ViewChild('videoPlayer2', { static: false }) videoPlayer2!: ElementRef<HTMLVideoElement>

  ngAfterViewInit(): void {
    if (this.videoPlayer) {
      const video = this.videoPlayer.nativeElement
      video.muted = true
      video.playsInline = true
      video.play().catch(err => console.warn('Autoplay bloqueado:', err))
    }

    if (this.videoPlayer2) {
      const video2 = this.videoPlayer2.nativeElement
      video2.muted = true
      video2.playsInline = true
      video2.play().catch(err => console.warn('Autoplay bloqueado:', err))
    }
  }

  snowflakes = Array.from({ length: 60 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    size: `${0.8 + Math.random() * 1.2}em`,
    color: '#86c1ec',
    duration: `${10 + Math.random() * 15}s`,
    delay: `${Math.random() * 10}s`,
    symbol: ['❄', '❅', '❆', '✻', '✼'][Math.floor(Math.random() * 5)],
  }))
}
