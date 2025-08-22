import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { PlaceService } from "../../../../core/services/place.service";
import { Place } from "../../../../core/models/place";
import { take } from "rxjs";
import { RouterModule } from "@angular/router";

const NG_MODULES = [CommonModule, RouterModule];

@Component({
  selector: 'app-carrousel',
  imports: [...NG_MODULES],
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})

export class CarrouselComponent implements OnInit {
  places: Place[] = [];
  isBrowser: boolean = false;

  constructor(private placeService: PlaceService,) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    // this.placeService.getPlaces().pipe(take(1)).subscribe({
    //   next: (data) => {
    //     this.places = data;
    //   },
    //   error: (error) => {
    //     console.error("Error al obtener los lugares", error);
    //   }
    // });
  }

  scrollToEmail() {
    const emailSection = document.getElementById('email');
    if (emailSection) {
      emailSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  openPdf()
  {
    const pdfUrl = 'https://taqe.cusco.gob.pe/publico/web/campeonato/BASES_CAMPEONATO_DE_FUTBOL_Y_VOLEY_INTER_ESCOLAR.pdf';
    window.open(pdfUrl, '_blank');
    window.open('public/images/bases_futbol_voley.pdf', '_blank');
  }

  openPdfAjedrez() {
    const pdfUrl = 'https://taqe.cusco.gob.pe/publico/web/campeonato/BASES_CAMPEONATO_INTERCOLEGIOS_DISCIPLINA_DE_AJEDREZ.pdf';
    window.open(pdfUrl, '_blank');
    window.open('public/images/bases_ajedrez.pdf', '_blank');
  }
}
