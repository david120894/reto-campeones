import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StandingsTableComponent } from '../standings-table/standings-table.component'
import { NgClass, NgForOf, NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms'

export interface TeamStanding {
  puesto?: number;
  club?: string;
  pj?: number;
  pg?: number;
  pe?: number;
  pp?: number;
  sf?: number;
  sc?: number;
  ds?: number;
  gf?: number;
  gc?: number;
  dg?: number;
  pts?: number;
}
export interface TeamStandingVoley {
  puesto: number;
  club: string;
  pj: number;
  pg: number;
  pp: number;
  sf: number;
  sc: number;
  ds: number;
  pts: number;
}

export interface Grupo {
  nombre: string;
  equipos?: TeamStanding[];
  typeTeam:string

}

export interface Deporte {
  nombre: string;
  grupos: Grupo[];
}

export interface NivelEducacion {
  nombre: string;
  deportes: Deporte[];
}

@Component({
  selector: 'app-presentation',
  imports: [
    StandingsTableComponent,
    NgForOf,
    NgIf,
    FormsModule,
  ],
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss',]
})
export class PresentationComponent implements OnInit, OnChanges {

  @Input() typeSection!: string;
  selectedDate = ""
  selectedLevel = ""
  selectedDeport = ""

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['typeSection']) {
    }
  }

  ngOnInit(): void {
    this.onFechaChange();
    this.onNivelChange();
    this.onDeporteChange();
  }

  fechas: Fecha[] = [
    {
      nombre: 'Primera Fecha',
      niveles: [
        {
          nombre: 'Primaria',
          deportes: [
            {
              nombre: 'Fútbol',
              grupos: [
                {
                  nombre: 'Grupo A',
                  equipos: [
                    { puesto: 1, club: 'I.E. FORTUNATO L. HERRERA', pj: 1, pg: 1, pe: 0, pp: 0, gf: 2, gc: 0, dg: 2, pts: 3 },
                    { puesto: 2, club: 'I.E. INCA GARCILASO DE LA VEGA', pj: 1, pg: 1, pe: 0, pp: 0, gf: 2, gc: 0, dg: 2, pts: 3 },
                    { puesto: 3, club: 'I.E. SAN CRISTOBAL', pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dg: 0, pts: 0 },
                    { puesto: 4, club: 'I.E. ASHID KUMAR BAHL', pj: 1, pg: 0, pe: 0, pp: 1, gf: 0, gc: 2, dg: -2, pts: 0 },
                    { puesto: 5, club: 'I.E. SIMON BOLIVAR', pj: 1, pg: 0, pe: 0, pp: 1, gf: 0, gc: 2, dg: -2, pts: 0 },
                  ],
                  typeTeam: 'F'
                },
                {
                  nombre: 'Grupo B',
                  equipos: [
                    { puesto: 1, club: 'I.E. ALEJANDRO SANCHEZ ARTEAGA', pj: 1, pg: 1, pe: 0, pp: 0, gf: 3, gc: 1, dg: 2, pts: 3 },
                    { puesto: 2, club: 'I.E. AYUDA MUTUA', pj: 1, pg: 1, pe: 0, pp: 0, gf: 1, gc: 0, dg: 1, pts: 3 },
                    { puesto: 3, club: 'I.E. HUMBERTO LUNA', pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dg: 0, pts: 0 },
                    { puesto: 4, club: 'I.E. EL NIÑO DIVINO', pj: 1, pg: 0, pe: 0, pp: 1, gf: 0, gc: 2, dg: -1, pts: 0 },
                    { puesto: 5, club: 'I.E. NUESTRA SEÑORA DE GRACIA', pj: 1, pg: 0, pe: 0, pp: 1, gf: 0, gc: 3, dg: -3, pts: 0 },
                  ],
                  typeTeam: 'F'

                },
                {
                  nombre: 'Grupo C',
                  equipos: [
                    { puesto: 1, club: 'I.E. DIEGO QUISPE TITO', pj: 1, pg: 1, pe: 0, pp: 0, gf: 7, gc: 1, dg: 6, pts: 3 },
                    { puesto: 2, club: 'I.E. CIENCIAS', pj: 1, pg: 1, pe: 0, pp: 0, gf: 3, gc: 0, dg: 3, pts: 3 },
                    { puesto: 3, club: 'I.E. RED DE COLEGIOS KANCHARISUN', pj: 1, pg: 1, pe: 0, pp: 0, gf: 3, gc: 0, dg: 1, pts: 3 },
                    { puesto: 4, club: 'I.E. SAN FRANCISCO E BORJA', pj: 1, pg: 0, pe: 0, pp: 1, gf: 0, gc: 3, dg: -3, pts: 0 },
                    { puesto: 5, club: 'I.E. URIEL GARCIA', pj: 1, pg: 0, pe: 0, pp: 1, gf: 1, gc: 7, dg: -3, pts: 0 },
                    { puesto: 6, club: 'I.E. SAN VICENTE DE PAUL', pj: 1, pg: 0, pe: 0, pp: 1, gf: 1, gc: 7, dg: -6, pts: 0 },
                  ],
                  typeTeam: 'F'
                },
                {
                  nombre: 'Grupo D',
                  equipos: [
                    { puesto: 1, club: 'I.E. DOLORESPATA', pj: 1, pg: 1, pe: 0, pp: 0, gf: 3, gc: 1, dg: 2, pts: 3 },
                    { puesto: 2, club: 'I.E. SAGRADO CORAZON DE JESUS', pj: 1, pg: 1, pe: 0, pp: 0, gf: 2, gc: 0, dg: 2, pts: 3 },
                    { puesto: 3, club: 'I.E. MARISCAL GAMARRA', pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dg: 0, pts: 0 },
                    { puesto: 4, club: 'I.E. HUANCABAMBA', pj: 1, pg: 0, pe: 0, pp: 1, gf: 1, gc: 3, dg: -2, pts: 0 },
                    { puesto: 5, club: 'I.E. MIGUEL GRAU SEMINARIO', pj: 1, pg: 0, pe: 0, pp: 1, gf: 0, gc: 2, dg: -2, pts: 0 },
                  ],
                  typeTeam: 'F'
                },
              ],

            },
            {
              nombre: 'Vóley',
              grupos: [
                {
                  nombre: 'Grupo A',
                  equipos: [
                    { puesto: 1, club: 'I.E. CLORINDA MATTO DE TURNER', pj: 1, pg: 1, pp: 0, sf: 2, sc: 0, ds: 2, pts: 3 },
                    { puesto: 2, club: 'I.E. HUMBERTO LUNA', pj: 1, pg: 1, pp: 0, sf: 2, sc: 0, ds: 2, pts: 3 },
                    { puesto: 3, club: 'I.E. AYUDA MUTUA', pj: 1, pg: 1, pp: 0, sf: 2, sc: 0, ds: 2, pts: 3 },
                    { puesto: 4, club: 'I.E. SIMON BOLIVAR', pj: 1, pg: 0, pp: 1, sf: 0, sc: 2, ds: -2, pts: 0 },
                    { puesto: 5, club: 'I.E. ASHID KUMAR BAHL', pj: 1, pg: 0, pp: 1, sf: 0, sc: 2, ds: -2, pts: 0 },
                    { puesto: 6, club: 'I.E. FORTUNATO L. HERRERA', pj: 1, pg: 0, pp: 1, sf: 0, sc: 2, ds: -2, pts: 0 },
                  ],
                  typeTeam: 'V'

                },
                {
                  nombre: 'Grupo B',
                  equipos: [
                    { puesto: 1, club: 'I.E. MIGUEL GRAU SEMINARIO', pj: 1, pg: 1, pp: 0, sf: 2, sc: 0, ds: 2, pts: 3 },
                    { puesto: 2, club: 'I.E. MARIA DE LA MERCED', pj: 1, pg: 1, pp: 0, sf: 2, sc: 0, ds: 2, pts: 3 },
                    { puesto: 3, club: 'I.E. EL NIÑO DIVINO', pj: 1, pg: 0, pp: 0, sf: 0, sc: 2, ds: -2, pts: 0 },
                    { puesto: 4, club: 'I.E. URIEL GARCIA', pj: 1, pg: 0, pp: 0, sf: 0, sc: 2, ds: -2, pts: 0 },
                    { puesto: 5, club: 'I.E. SAGRADO CORACON DE JESUS', pj: 0, pg: 0, pp: 0, sf: 0, sc: 0, ds: 0, pts: 0 },
                  ],
                  typeTeam: 'V'

                },
              ],
            },

          ],
        },
        {
          nombre: 'Secundaria',
          deportes: [
            {
              nombre: 'Fútbol',
              grupos: [
                {
                  nombre: 'Grupo A',
                  equipos: [
                    { puesto: 1, club: 'I.E. San Francisco de Borja', pj: 1, pg: 1, pe: 0, pp: 0, gf: 3, gc: 1, dg: 2, pts: 3, },
                    { puesto: 2, club: 'I.E. Ciencias', pj: 1, pg: 1, pe: 0, pp: 0, gf: 2, gc: 0, dg: 2, pts: 3 },
                    { puesto: 3, club: 'I.E. 51003 Rosario', pj: 1, pg: 1, pe: 0, pp: 0, gf: 2, gc: 0, dg: 2, pts: 3 },
                    { puesto: 4, club: 'I.E. Humberto Luna', pj: 1, pg: 0, pe: 0, pp: 1, gf: 1, gc: 3, dg: -2, pts: 0 },
                    { puesto: 5, club: 'I.E. Fortunato L. Herrera', pj: 1, pg: 0, pe: 0, pp: 1, gf: 0, gc: 2, dg: -2, pts: 0, },
                    { puesto: 6, club: 'I.E. San Vicente de Paul', pj: 1, pg: 0, pe: 0, pp: 1, gf: 0, gc: 2, dg: -2, pts: 0, },
                  ],
                  typeTeam: 'F'

                },
                {
                  nombre: 'Grupo B',
                  equipos: [
                    { puesto: 1, club: 'I.E. Diego Quispe Tito', pj: 1, pg: 1, pe: 0, pp: 0, gf: 4, gc: 2, dg: 2, pts: 3, },
                    { puesto: 2, club: 'I.E. Garcilazo de la Vega', pj: 1, pg: 1, pe: 0, pp: 0, gf: 2, gc: 1, dg: 1, pts: 3, },
                    { puesto: 3, club: 'I.E. Miguel Grau Seminario', pj: 1, pg: 0, pe: 1, pp: 0, gf: 0, gc: 0, dg: 0, pts: 1, },
                    { puesto: 4, club: 'I.E. Luis Vallejo Santoni', pj: 1, pg: 0, pe: 1, pp: 0, gf: 0, gc: 0, dg: 0, pts: 1, },
                    { puesto: 5, club: 'I.E. Uriel García', pj: 1, pg: 0, pe: 0, pp: 1, gf: 1, gc: 2, dg: -1, pts: 0 },
                    { puesto: 6, club: 'I.E. Sagrado Corazón de Jesús', pj: 1, pg: 0, pe: 0, pp: 1, gf: 2, gc: 4, dg: -2, pts: 0, },
                  ],
                  typeTeam: 'F'
                },
              ],

            },
            {
              nombre: 'Vóley',
              grupos: [
                {
                  nombre: 'Grupo A',
                  equipos: [
                    { puesto: 1, club: 'I.E. COMERCIO 41', pj: 1, pg: 1, pp: 0, sf: 2, sc: 0, ds: 2, pts: 3 },
                    { puesto: 2, club: 'I.E. EDUCANDAS', pj: 1, pg: 1, pp: 0, sf: 2, sc: 0, ds: 2, pts: 3 },
                    { puesto: 3, club: 'I.E. CLORINDA MATTO DE TURNER', pj: 1, pg: 1, pp: 0, sf: 2, sc: 0, ds: 2, pts: 3 },
                    { puesto: 4, club: 'I.E. ROSARIO', pj: 1, pg: 0, pp: 1, sf: 0, sc: 2, ds: -2, pts: 0 },
                    { puesto: 5, club: 'I.E. HUMBERTO LUNA', pj: 1, pg: 0, pp: 1, sf: 0, sc: 2, ds: -2, pts: 0 },
                    { puesto: 6, club: 'I.E. FORTUNATO L. HERRERA', pj: 1, pg: 0, pp: 1, sf: 0, sc: 2, ds: -2, pts: 0 },
                  ],
                  typeTeam: 'V'
                },
                {
                  nombre: 'Grupo B',
                  equipos: [
                    { puesto: 1, club: 'I.E. MARIA DE LA MERCED', pj: 1, pg: 1, pp: 0, sf: 2, sc: 0, ds: 2, pts: 3 },
                    { puesto: 2, club: 'I.E. URIEL GARCIA', pj: 1, pg: 1, pp: 0, sf: 2, sc: 0, ds: 2, pts: 3 },
                    { puesto: 3, club: 'I.E. LUIS VALLEJO SANTONI', pj: 1, pg: 0, pp: 1, sf: 0, sc: 2, ds: -2, pts: 0 },
                    { puesto: 4, club: 'I.E. SAN FRANCISCO DE BORJA', pj: 1, pg: 0, pp: 1, sf: 0, sc: 2, ds: -2, pts: 0 },
                    { puesto: 5, club: 'I.E. MIGUEL GRAU SEMINARIO', pj: 0, pg: 0, pp: 0, sf: 0, sc: 0, ds: 0, pts: 0 },
                    { puesto: 6, club: 'I.E. SAGRADO CORAZON DE JESUS', pj: 0, pg: 0, pp: 0, sf: 0, sc: 0, ds: 0, pts: 0 },
                  ],
                  typeTeam: 'V'
                },
              ]
            },
          ],
        },
      ],
    },
  ];


  fechaSeleccionada?: Fecha;
  nivelSeleccionado?: NivelEducacion;
  deporteSeleccionado?: Deporte;

  onFechaChange(event?: Event) {

    const value = event ? (event.target as HTMLSelectElement).value : "";
    if (value === "") {
      this.selectedDate = this.fechas[0].nombre!;
      this.fechaSeleccionada = this.fechas[0]
      this.nivelSeleccionado = undefined;
      this.deporteSeleccionado = undefined;
      // this.onNivelChange();
    } else {
      this.fechaSeleccionada = this.fechas.find(f => f.nombre === value)
      this.nivelSeleccionado = this.fechaSeleccionada?.niveles[0];
      this.deporteSeleccionado = undefined;
      this.nivelSeleccionado = undefined;
      this.onNivelChange();
    }
  }

  onNivelChange(event?: Event) {
    const value = event ? (event.target as HTMLSelectElement).value : "";
    if (value === "") {
      this.selectedLevel = this.fechaSeleccionada?.niveles[0].nombre!;
      this.nivelSeleccionado = this.fechaSeleccionada?.niveles[0];
      this.deporteSeleccionado = undefined;
      this.onDeporteChange();

    } else {
      this.nivelSeleccionado = this.fechaSeleccionada?.niveles.find(n => n.nombre === value);
      this.selectedDeport = this.nivelSeleccionado?.deportes[0].nombre!;
      this.deporteSeleccionado = undefined;
      this.onDeporteChange();
    }
  }

  onDeporteChange(event?: Event) {
    const value = event ? (event.target as HTMLSelectElement).value : "";
    if (value === "") {
      this.selectedDeport = this.nivelSeleccionado?.deportes[0].nombre!;
      this.deporteSeleccionado = this.nivelSeleccionado?.deportes[0];
    } else {
      this.deporteSeleccionado = this.nivelSeleccionado?.deportes.find(d => d.nombre === value);
    }
  }

}


export interface Fecha {
  nombre: string;
  niveles: NivelEducacion[];
}
