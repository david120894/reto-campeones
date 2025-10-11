import { Component } from '@angular/core';
import { StandingsTableComponent, TeamStanding } from '../standings-table/standings-table.component'

@Component({
  selector: 'app-gallery-inter-neighborhood',
  standalone: true,
  imports: [StandingsTableComponent],
  templateUrl: './gallery-inter-neighborhood.component.html',
  styleUrls: ['./gallery-inter-neighborhood.component.scss'],
})
export class GalleryInterNeighborhoodComponent {
  tablaGrupoA: TeamStanding[] = [
    { puesto: 1, club: 'I.E. FORTUNATO L. HERRERA', pj: 1, pg: 1, pe: 0, pp: 0, gf: 2, gc: 0, dg: 2, pts: 3 },
    { puesto: 2, club: 'I.E. INCA GARCILASO DE LA VEGA', pj: 1, pg: 1, pe: 0, pp: 0, gf: 2, gc: 0, dg: 2, pts: 3 },
    { puesto: 3, club: 'I.E. SAN CRISTOBAL', pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dg: 0, pts: 0 },
    { puesto: 4, club: 'I.E. ASHID KUMAR BAHL', pj: 1, pg: 0, pe: 0, pp: 1, gf: 0, gc: 2, dg: -2, pts: 0 },
    { puesto: 5, club: 'I.E. SIMON BOLIVAR', pj: 1, pg: 0, pe: 0, pp: 1, gf: 0, gc: 2, dg: -2, pts: 0 }
  ];
}

