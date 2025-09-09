import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef, EventEmitter,
  OnDestroy,
  OnInit, Output,
  ViewChild,
} from '@angular/core';
import { DatePipe, NgClass, NgForOf, NgIf } from '@angular/common'
import { RouterLink } from '@angular/router'
import { ResponseRegisterModels } from '../../../../core/models/response.register.models'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ReservationService } from '../../../../core/services/reservation.service'

interface CarouselItem {
  type: 'image' | 'video';
  src: string;
  title?: string;
}

@Component({
  selector: 'app-section-home',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    NgClass,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './section-home.component.html',
  styleUrls: ['./section-home.component.scss']
})
export class SectionHomeComponent implements OnInit, OnDestroy , AfterViewInit  {

  objectRegister: ResponseRegisterModels | null = null;

  isModalOpen = false;
  imageModal: string = '';
  showModal = false;

  mensajeExito: string | null = null;


  formSearchDni: FormGroup = new FormGroup({
    searchDni: new FormControl(''),
  });

  get search() {
    return this.formSearchDni.controls;
  }
  @Output() sectionChanged = new EventEmitter<string>();
  items: CarouselItem[] = [
    { type: 'image', src: 'bike/bike-ride.png', title: 'Imagen 2' },
    { type: 'image', src: 'championship/logo1.png', title: 'Imagen 1' },
  ];

  selectedItem = ''
  currentIndex = 0;

  days: string = '00';
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';

  private intervalId: any;

  constructor(
    private reservationService: ReservationService,
    ) {}

  ngOnInit() {
    this.updateCountdown();
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);
    this.selectItem(0);
  }

  searchByDni() {
    const dni = this.search['searchDni'].value;
    this.reservationService.searchByDni(dni).subscribe({
      next: (response) => {
        this.objectRegister = response;
        this.imageModal = this.objectRegister.qrCode.image;
        this.showModal = true;
        this.formSearchDni.reset();
        this.closeModal();
      },
      error: (error) => {
        console.error('Usuario no registrado aun');
        this.mensajeExito = 'El DNI ingresado no está registrado.';
      },
    });
  }


  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  get currentItem(): CarouselItem {
    return this.items[this.currentIndex];
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.selectItem(this.currentIndex);
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.selectItem(this.currentIndex);
  }

  selectItem(index: number) {
    const item: Record<string, string> = {
      0:"bike-ride",
      1:"challenge-champions",
      // 3:"interscholastic-championship",
    }
    this.selectedItem = item[index] || '';
    this.currentIndex = index;
    this.sectionChanged.emit(this.selectedItem);
  }

  private updateCountdown() {
    const eventDate = new Date('August 16, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance <= 0) {
      this.days = this.hours = this.minutes = this.seconds = '00';
      clearInterval(this.intervalId);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.days = days.toString().padStart(2, '0');
    this.hours = hours.toString().padStart(2, '0');
    this.minutes = minutes.toString().padStart(2, '0');
    this.seconds = seconds.toString().padStart(2, '0');
  }

  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoPlayer2', { static: false }) videoPlayer2!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    if (this.videoPlayer) {
      const video = this.videoPlayer.nativeElement;
      video.muted = true;
      video.playsInline = true;
      video.play().catch(err => console.warn('Autoplay bloqueado:', err));
    }

    if (this.videoPlayer2) {
      const video2 = this.videoPlayer2.nativeElement;
      video2.muted = true;
      video2.playsInline = true;
      video2.play().catch(err => console.warn('Autoplay bloqueado:', err));
    }
  }

  printModal() {
    const modalContentElement = document.querySelector('.modal-content');

    if (modalContentElement) {
      const clonedContent = modalContentElement.cloneNode(true) as HTMLElement;

      const noPrintElements = clonedContent.querySelectorAll('.no-print');
      noPrintElements.forEach(el => el.remove());

      const originalContent = document.body.innerHTML;

      document.body.innerHTML = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              margin: 0;
              padding: 0;
              height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            img {
              max-width: 300px;
              margin-bottom: 20px;
              display: block;
            }
            h5 {
              margin: 8px 0;
              font-size: 16px;
            }
            .content-wrapper {
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="content-wrapper">
            ${clonedContent.innerHTML}
          </div>
        </body>
      </html>
    `;

      window.print();

      setTimeout(() => {
        document.body.innerHTML = originalContent;
        window.location.reload();
      }, 1000);
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  closeModalPrint() {
    this.showModal = false;
  }
}
