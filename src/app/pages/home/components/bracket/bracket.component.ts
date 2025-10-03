import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'

interface Team {
  name: string;
}
interface Match {
  id: string;
  team1: Team | null;
  team2: Team | null;
  winner?: Team | null;
  nextMatchId?: string;
  position?: 'team1' | 'team2';
}

interface Team {
  name: string;
}
interface Match {
  id: string;
  team1: Team | null;
  team2: Team | null;
  winner?: Team | null;
}

@Component({
  selector: 'app-bracket',
  imports: [NgForOf, NgIf, FormsModule],
  templateUrl: './bracket.component.html'
})
export class BracketComponent {
  @Input() typeSection!: string;
  // categorías disponibles
  categories = ['futbol-primaria', 'futbol-secundaria', 'voley-primaria', 'voley-secundaria'];
  selectedCategory = 'futbol-primaria';

  matchesByCategory: { [key: string]: Match[] } = {
    'futbol-primaria': [
      // Octavos (8 matches)
      { id: 'R16-1', team1: { name: 'I.E INCA GARCILAZO DE LA VEGA' }, team2: { name: 'I.E EL NIÑO DIVINO' } },
      { id: 'R16-2', team1: { name: 'I.E MARISCAL GAMARRA' }, team2: { name: 'I.E SAGRADO CORAZON DE JESUS' } },
      { id: 'R16-3', team1: { name: 'I.E SAN VICENTE DE PAUL' }, team2: { name: 'I.E DOLORES PATA' } },
      { id: 'R16-4', team1: { name: 'I.E AYUDA MUTUA' }, team2: { name: 'I.E CIENCIAS' } },
      { id: 'R16-5', team1: { name: 'I.E SIMON BOLIVAR' }, team2: { name: 'I.E URIEL GARCIA' } },
      { id: 'R16-6', team1: { name: 'I.E HUANCABAMBA' }, team2: { name: 'I.E ASHIT KUMAR BAHL' } },
      { id: 'R16-7', team1: { name: 'I.E ALEJANDRO SANCHES ARTEAGA' }, team2: { name: 'I.E DIEGO QUISPE TTITO' } },
      { id: 'R16-8', team1: { name: 'I.E SAN FRANCISCO DE BORJA' }, team2: { name: 'I.E HUMBERTO LUNA' } },

      // Cuartos (4 matches)
      { id: 'QF-1', team1: null, team2: null },
      { id: 'QF-2', team1: null, team2: null },
      { id: 'QF-3', team1: null, team2: null },
      { id: 'QF-4', team1: null, team2: null },

      // Semifinales (2 matches)
      { id: 'SF-1', team1: null, team2: null },
      { id: 'SF-2', team1: null, team2: null },

      // Final
      { id: 'F-1', team1: null, team2: null },

      // 3er puesto
      { id: '3P-1', team1: null, team2: null }
    ],
    'futbol-secundaria': [
      // Cuartos
      { id: 'QF-1', team1: { name: 'I.E SAN FRANCISCO DE BORJA' }, team2: { name: 'I.E URIEL GARCIA' } },
      { id: 'QF-2', team1: { name: 'I.E  AGRADO CORAZON DE JESUS' }, team2: { name: 'I.E INCA GARCILAZO DE LA VEGA' } },
      { id: 'QF-3', team1: { name: 'I.E CIENCIAS' }, team2: { name: 'I.E ROSARIO' } },
      { id: 'QF-4', team1: { name: 'I.E HUMBERTO LUNA' }, team2: { name: 'I.E MIGUEL GRAU SEMINARIO' } },
      // Semifinales
      { id: 'SF-1', team1: null, team2: null },
      { id: 'SF-2', team1: null, team2: null },
      // Final
      { id: 'F-1', team1: null, team2: null },
      // 3er puesto
      { id: '3P-1', team1: null, team2: null }
    ],
    'voley-primaria': [
      { id: 'QF-1', team1: { name: 'I.E MIGUEL GRAU SEMINARIO' }, team2: { name: 'I.E SIMON BOLIVAR' } },
      { id: 'QF-2', team1: { name: 'I.E URIEL GARCIA' }, team2: { name: 'I.E CLORINDA MATTO DE TURNER' } },
      { id: 'QF-3', team1: { name: 'I.E ASHIT KUMAR BAHAL' }, team2: { name: 'I.E MARIA DE LA MERCED' } },
      { id: 'QF-4', team1: { name: 'I.E SAGRADO CORAZON DE JESUS' }, team2: { name: 'I.E HUMBERTO LUNA' } },
      { id: 'SF-1', team1: null, team2: null },
      { id: 'SF-2', team1: null, team2: null },
      { id: 'F-1', team1: null, team2: null },
      { id: '3P-1', team1: null, team2: null }
    ],
    'voley-secundaria': [
      { id: 'QF-1', team1: { name: 'I.E MIGUEL GRAU SEMINARIO' }, team2: { name: 'I.E EDUCANDAS' } },
      { id: 'QF-2', team1: { name: 'I.E URIEL GARCIA' }, team2: { name: 'I.E MARIA DE LA MERCED' } },
      { id: 'QF-3', team1: { name: 'I.E COMERCIO 41' }, team2: { name: 'I.E SAGRADO CORAZON DE JESUS' } },
      { id: 'QF-4', team1: { name: 'I.E CLORINDA MATTO DE TURNER' }, team2: { name: 'I.E ROSARIO' } },
      { id: 'SF-1', team1: null, team2: null },
      { id: 'SF-2', team1: null, team2: null },
      { id: 'F-1', team1: null, team2: null },
      { id: '3P-1', team1: null, team2: null }
    ]
  };

  getRounds(prefix: string): Match[] {
    return this.matchesByCategory[this.selectedCategory].filter(m => m.id.startsWith(prefix));
  }

  selectWinner(match: Match, team: Team) {
    match.winner = team;
  }
}
