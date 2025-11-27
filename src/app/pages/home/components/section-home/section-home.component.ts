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
import html2canvas from 'html2canvas';

interface CarouselItem {
  type: 'image' | 'video';
  src: string;
  title?: string;
}

@Component({
  selector: 'app-section-home',
  standalone: true,
  imports: [
    NgIf,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
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
  showMessage: boolean = false;

  formSearchDni: FormGroup = new FormGroup({
    searchDni: new FormControl(''),
  });

  get search() {
    return this.formSearchDni.controls;
  }

  @Output() sectionChanged = new EventEmitter<string>();

  items: CarouselItem[] = [
    { type: 'image', src: 'bike/bike-ride.png', title: 'Bicicleteada Familiar' },
    { type: 'image', src: 'championship/logo1.png', title: 'Challenge Champions' },
    { type: 'image', src: 'championship/logo1.png', title: 'Seminarios' },
    { type: 'image', src: 'championship/logo1.png', title: 'Vacaciones Útiles' },
  ];

  selectedItem = 'bike-ride';
  currentIndex = 1; // Iniciar con la bicicleteada

  days: string = '00';
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';

  private intervalId: any;

  constructor(
    private reservationService: ReservationService,
  ) {}

  ngOnInit() {
    this.selectItem(1); // Iniciar con la bicicleteada
  }

  // Método para las clases de las pestañas
  getTabClasses(event: string) {
    const baseClasses = 'flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300';
    if (this.selectedItem === event) {
      return `${baseClasses} bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg`;
    } else {
      return `${baseClasses} bg-transparent text-gray-300 hover:text-white hover:bg-white/5`;
    }
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
        this.showMessage = true;
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
      0: "challenge-champions",
      1: "bike-ride",
      2: "seminar",
      3: "useful-vacations",
    }
    this.selectedItem = item[index] || '';
    this.currentIndex = index;
    this.sectionChanged.emit(this.selectedItem);
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
    this.showMessage = false;
    this.formSearchDni.reset();
  }

  closeModalPrint() {
    this.showModal = false;
  }

  async shareModal() {
    const modalElement = document.querySelector('.modal-content') as HTMLElement;

    if (!modalElement) {
      console.error("No se encontró el modal");
      return;
    }

    const canvas = await html2canvas(modalElement, {
      ignoreElements: (element) => element.classList.contains('no-print')
    });

    const dataUrl = canvas.toDataURL("image/png");
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const file = new File([blob], "inscripcion.png", { type: blob.type });

    if (navigator.share && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: "Inscripción",
        text: "Aquí está mi inscripción con QR",
        files: [file]
      });
    } else {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "inscripcion.png";
      link.click();
    }
  }
  goUsefulVacations() {
    const tablePositions = document.getElementById('useful-inscriptions')
    if (tablePositions) {
      tablePositions.scrollIntoView({ behavior: 'smooth' })
    }
  }

  goSeminarRegistration() {
    const tablePositions = document.getElementById('seminar-inscriptions')
    if (tablePositions) {
      tablePositions.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
