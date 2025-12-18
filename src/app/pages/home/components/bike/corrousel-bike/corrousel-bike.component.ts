import { Component, Input, OnInit, SimpleChanges } from '@angular/core'
import { Place } from '../../../../../core/models'
import { PlaceService } from '../../../../../core/services/place.service'

@Component({
  selector: 'app-corrousel-bike',
  imports: [],
  templateUrl: './corrousel-bike.component.html',
  styleUrl: './corrousel-bike.component.scss'
})
export class CorrouselBikeComponent implements OnInit{

  @Input() typeSection!: string;

  imagen1 = 'children/children.jpg';
  imagen2 = 'bike-rider/IMG_2240.jpg';

  places: Place[] = [];
  isBrowser: boolean = false;

  constructor(private placeService: PlaceService,) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['typeSection']) {
    }
  }
  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
  }

  scrollToEmail() {
    const emailSection = document.getElementById('email');
    if (emailSection) {
      emailSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  openPdf()
  {
    let pdfUrl = '';

      pdfUrl= 'https://taqe.cusco.gob.pe/publico/web/campeonato/1RA_GRAN_BICICLETEADA_FAMILIAR_BASE.pdf'
      // https://taqe.cusco.gob.pe/publico/web/campeonato/1RA_GRAN_BICICLETEADA_FAMILIAR_BASE.pdf
    // const pdfUrl = 'https://taqe.cusco.gob.pe/publico/web/campeonato/BASES_CAMPEONATO_DE_FUTBOL_Y_VOLEY_INTER_ESCOLAR.pdf';
    window.open(pdfUrl, '_blank');
    window.open('public/images/bases_futbol_voley.pdf', '_blank');
  }

  openPdfAjedrez() {
    const pdfUrl = 'https://taqe.cusco.gob.pe/publico/web/campeonato/BASES_CAMPEONATO_INTERCOLEGIOS_DISCIPLINA_DE_AJEDREZ.pdf';
    window.open(pdfUrl, '_blank');
    window.open('public/images/bases_ajedrez.pdf', '_blank');
  }
}
