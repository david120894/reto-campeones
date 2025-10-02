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

@Component({
  selector: 'app-bracket',
  standalone: true,
  imports: [NgForOf, NgIf, FormsModule],
  templateUrl: './bracket.component.html'
})
export class BracketComponent {
  @Input() typeSection!: string;
  // categorías disponibles
  categories = ['futbol-primaria', 'futbol-secundaria', 'voley-primaria', 'voley-secundaria'];
  selectedCategory = 'futbol-primaria';

  // Diccionario de brackets por categoría
  matchesByCategory: { [key: string]: Match[] } = {
    // ⚽ FUTBOL PRIMARIA (con octavos → R16)
    'futbol-primaria': [
      // Octavos izquierda
      { id: 'R16-1', team1: { name: 'I.E. INCA GARCILASO' }, team2: { name: 'I.E. EL NIÑO DIVINO' }, nextMatchId: 'QF-1', position: 'team1' },
      { id: 'R16-2', team1: { name: 'I.E. MARISCAL GAMARRA' }, team2: { name: 'I.E. SAGRADO CORAZÓN' }, nextMatchId: 'QF-1', position: 'team2' },
      { id: 'R16-3', team1: { name: 'I.E. SAN VICENTE' }, team2: { name: 'I.E. DOLORESPATA' }, nextMatchId: 'QF-2', position: 'team1' },
      { id: 'R16-4', team1: { name: 'I.E. AYUDA MUTUA' }, team2: { name: 'I.E. CIENCIAS' }, nextMatchId: 'QF-2', position: 'team2' },
      // Octavos derecha
      { id: 'R16-5', team1: { name: 'I.E. SIMÓN BOLÍVAR' }, team2: { name: 'I.E. URIEL GARCIA' }, nextMatchId: 'QF-3', position: 'team1' },
      { id: 'R16-6', team1: { name: 'I.E. HUANCABAMBA' }, team2: { name: 'I.E. ASHID KUMAR' }, nextMatchId: 'QF-3', position: 'team2' },
      { id: 'R16-7', team1: { name: 'I.E. ALEJANDRO SÁNCHEZ' }, team2: { name: 'I.E. DIEGO QUISPE' }, nextMatchId: 'QF-4', position: 'team1' },
      { id: 'R16-8', team1: { name: 'I.E. SAN FRANCISCO' }, team2: { name: 'I.E. HUMBERTO LUNA' }, nextMatchId: 'QF-4', position: 'team2' },

      // Cuartos
      { id: 'QF-1', team1: null, team2: null, nextMatchId: 'SF-1', position: 'team1' },
      { id: 'QF-2', team1: null, team2: null, nextMatchId: 'SF-1', position: 'team2' },
      { id: 'QF-3', team1: null, team2: null, nextMatchId: 'SF-2', position: 'team1' },
      { id: 'QF-4', team1: null, team2: null, nextMatchId: 'SF-2', position: 'team2' },

      // Semis
      { id: 'SF-1', team1: null, team2: null, nextMatchId: 'F-1', position: 'team1' },
      { id: 'SF-2', team1: null, team2: null, nextMatchId: 'F-1', position: 'team2' },

      // Final
      { id: 'F-1', team1: null, team2: null }
    ],

    // ⚽ FUTBOL SECUNDARIA (desde cuartos → QF)
    'futbol-secundaria': [
      { id: 'QF-1', team1: { name: 'COL. NACIONAL CUSCO' }, team2: { name: 'COL. SAN JOSÉ' }, nextMatchId: 'SF-1', position: 'team1' },
      { id: 'QF-2', team1: { name: 'COL. TECNOLÓGICO' }, team2: { name: 'COL. LA MERCED' }, nextMatchId: 'SF-1', position: 'team2' },
      { id: 'QF-3', team1: { name: 'COL. DON BOSCO' }, team2: { name: 'COL. MANUEL PRADO' }, nextMatchId: 'SF-2', position: 'team1' },
      { id: 'QF-4', team1: { name: 'COL. CÓNDOR' }, team2: { name: 'COL. AYACUCHO' }, nextMatchId: 'SF-2', position: 'team2' },

      { id: 'SF-1', team1: null, team2: null, nextMatchId: 'F-1', position: 'team1' },
      { id: 'SF-2', team1: null, team2: null, nextMatchId: 'F-1', position: 'team2' },

      { id: 'F-1', team1: null, team2: null }
    ],

    // 🏐 VOLEY PRIMARIA (desde cuartos → QF)
    'voley-primaria': [
      { id: 'QF-1', team1: { name: 'I.E. PRIMARIA A' }, team2: { name: 'I.E. PRIMARIA B' }, nextMatchId: 'SF-1', position: 'team1' },
      { id: 'QF-2', team1: { name: 'I.E. PRIMARIA C' }, team2: { name: 'I.E. PRIMARIA D' }, nextMatchId: 'SF-1', position: 'team2' },
      { id: 'QF-3', team1: { name: 'I.E. PRIMARIA E' }, team2: { name: 'I.E. PRIMARIA F' }, nextMatchId: 'SF-2', position: 'team1' },
      { id: 'QF-4', team1: { name: 'I.E. PRIMARIA G' }, team2: { name: 'I.E. PRIMARIA H' }, nextMatchId: 'SF-2', position: 'team2' },

      { id: 'SF-1', team1: null, team2: null, nextMatchId: 'F-1', position: 'team1' },
      { id: 'SF-2', team1: null, team2: null, nextMatchId: 'F-1', position: 'team2' },

      { id: 'F-1', team1: null, team2: null }
    ],

    // 🏐 VOLEY SECUNDARIA (desde cuartos → QF)
    'voley-secundaria': [
      { id: 'QF-1', team1: { name: 'COL. VOLEY 1' }, team2: { name: 'COL. VOLEY 2' }, nextMatchId: 'SF-1', position: 'team1' },
      { id: 'QF-2', team1: { name: 'COL. VOLEY 3' }, team2: { name: 'COL. VOLEY 4' }, nextMatchId: 'SF-1', position: 'team2' },
      { id: 'QF-3', team1: { name: 'COL. VOLEY 5' }, team2: { name: 'COL. VOLEY 6' }, nextMatchId: 'SF-2', position: 'team1' },
      { id: 'QF-4', team1: { name: 'COL. VOLEY 7' }, team2: { name: 'COL. VOLEY 8' }, nextMatchId: 'SF-2', position: 'team2' },

      { id: 'SF-1', team1: null, team2: null, nextMatchId: 'F-1', position: 'team1' },
      { id: 'SF-2', team1: null, team2: null, nextMatchId: 'F-1', position: 'team2' },

      { id: 'F-1', team1: null, team2: null }
    ],
  };

  // retorna los partidos según categoría actual
  get matches(): Match[] {
    return this.matchesByCategory[this.selectedCategory];
  }

  selectWinner(match: Match, team: Team) {
    match.winner = team;
    if (match.nextMatchId) {
      const next = this.matches.find(m => m.id === match.nextMatchId);
      if (next) {
        next[match.position!] = team;
      }
    }
  }

  getRounds(prefix: string) {
    return this.matches.filter(m => m.id.startsWith(prefix));
  }
}
