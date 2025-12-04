import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef, EventEmitter, inject,
  OnDestroy,
  OnInit, Output, signal,
  ViewChild,
} from '@angular/core'
import { DatePipe, NgClass, NgForOf, NgIf } from '@angular/common'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
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
    NgForOf,
    NgClass,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './section-home.component.html',
  styleUrls: ['./section-home.component.scss']
})
export class SectionHomeComponent implements OnInit, OnDestroy , AfterViewInit  {

  loading = signal(false)
  selectedTab: string = 'bike-ride';
  objectRegister: ResponseRegisterModels | null = null;
  router = inject(Router)
  activaRouter = inject(ActivatedRoute)

  isModalOpen = false;
  imageModal: string = '';
  showModal = false;

  mensajeExito: string | null = null;
  showMessage: boolean = false;

  arraySection= [
    {
      id: 0,
      name:'bike-ride',
    },
    {
      id: 1,
      name:'challenge-champions',
    },
    {
      id: 2,
      name:'seminar',
    },
    {
      id: 3,
      name:'useful-vacations',
    },
  ];
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
    const params = this.activaRouter.snapshot.params['id']
    const selectSection = this.arraySection.find(section => section.name=== params)
    if(selectSection !== undefined) {
      this.selectItem(selectSection?.id!)
    }else {
      this.selectItem(2)
    }
  }

  // Método para las clases de las pestañas
  getTabClasses(event: string) {
    const base =
      'flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 border';

    // Seleccionado
    if (this.selectedItem === event) {
      return `${base} bg-primary text-white border-primary shadow-md`;
    }

    // No seleccionado
    return `${base} bg-transparent text-primary border-primary hover:bg-primary/10 hover:text-primary`;
  }




  searchByDni() {
    console.log(this.selectedItem)
    const dni = this.search['searchDni'].value;
    if (this.selectedItem === 'seminar') {
      this.loading.set(true)
      this.reservationService.searchByDniRegisterSeminar(dni).subscribe({
        next: (response) => {
          this.objectRegister = response;
          this.imageModal = this.objectRegister.qrCode.image;
          this.showModal = true;
          this.formSearchDni.reset();
          this.loading.set(false)
          this.closeModal();
        },
        error: (error) => {
          console.error('Usuario no registrado aun');
          this.showMessage = true;
          this.mensajeExito = 'El DNI ingresado no está registrado.';
          this.loading.set(false)

        },
      })
    }else{
      this.loading.set(true)
      this.reservationService.searchByDni(dni).subscribe({
        next: (response) => {
          this.objectRegister = response;
          this.imageModal = this.objectRegister.qrCode.image;
          this.showModal = true;
          this.loading.set(false)
          this.formSearchDni.reset();
          this.closeModal();
        },
        error: (error) => {
          console.error('Usuario no registrado aun');
          this.showMessage = true;
          this.loading.set(false)
          this.mensajeExito = 'El DNI ingresado no está registrado.';
        },
      });
    }
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
    const original = document.querySelector('.modal-content') as HTMLElement;

    if (!original) {
      console.error("No se encontró el modal");
      return;
    }

    // Clonar modal
    const clone = original.cloneNode(true) as HTMLElement;
    clone.style.position = 'fixed';
    clone.style.top = '-9999px';
    clone.style.left = '-9999px';
    clone.style.zIndex = '999999';

    // Quitar TODAS las clases Tailwind (que generan oklch)
    this.removeTailwindClasses(clone);

    // Colores seguros
    clone.style.background = "#1f2937";      // gris oscuro estable
    clone.style.color = "#ffffff";          // texto blanco
    clone.style.border = "1px solid #4b5563";
    clone.style.padding = "20px";
    clone.style.borderRadius = "12px";

    // Arreglar imágenes internas
    clone.querySelectorAll("img").forEach((img: any) => {
      img.style.boxShadow = "0 4px 12px rgba(0,0,0,0.25)";
      img.style.borderRadius = "8px";
    });

    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      backgroundColor: "#1f2937",
      useCORS: true,
      scale: 2,
    });

    document.body.removeChild(clone);

    const dataUrl = canvas.toDataURL("image/png");
    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], "inscripcion.png", { type: blob.type });

    if (navigator.share && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: "Inscripción",
        text: "Aquí está mi inscripción con QR",
        files: [file],
      });
    } else {
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "inscripcion.png";
      a.click();
    }
  }

  /** ELIMINA TODAS LAS CLASES TAILWIND DEL CLON */
  removeTailwindClasses(element: HTMLElement) {
    // Para el nodo principal
    if ("className" in element && typeof element.className === "string") {
      element.className = "";
    } else if (element instanceof SVGElement) {
      element.removeAttribute("class");
    }

    // Para todos sus hijos
    element.querySelectorAll("*").forEach((el: any) => {
      if ("className" in el && typeof el.className === "string") {
        el.className = "";
      } else if (el instanceof SVGElement) {
        el.removeAttribute("class");
      }
    });
  }




  goUsefulVacations() {
    const tablePositions = document.getElementById('useful-inscriptions')
    if (tablePositions) {
      tablePositions.scrollIntoView({ behavior: 'smooth' })
    }
  }

  goSeminarRegistration() {
    this.router.navigate(['/seminar-register']);
  }

  // En tu componente TypeScript
  snowflakes = Array.from({ length: 60 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    size: `${0.8 + Math.random() * 1.2}em`,
    color:'#86c1ec',
    duration: `${10 + Math.random() * 15}s`,
    delay: `${Math.random() * 10}s`,
    symbol: ['❄', '❅', '❆', '✻', '✼'][Math.floor(Math.random() * 5)]
  }));
}

