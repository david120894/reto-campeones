import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

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
  imports: [NgForOf, NgIf],
  templateUrl: './bracket.component.html'
})
export class BracketComponent {
  @Input() typeSection!: string;

  matches: Match[] = [
    // Octavos
    { id: 'R16-1', team1: { name: 'I.E. INCA GARCILASO DE LA VEGA' }, team2: { name: 'I.E. EL NIÑO DIVINO' }, nextMatchId: 'QF-1', position: 'team1' },
    { id: 'R16-2', team1: { name: 'I.E. MARISCAL GAMARRA' }, team2: { name: 'I.E. SAGRADO CORAZON DE JESUS' }, nextMatchId: 'QF-1', position: 'team2' },
    { id: 'R16-3', team1: { name: 'I-E. SAN VICENTE DE PAUL' }, team2: { name: 'I.E. DOLORESPATA' }, nextMatchId: 'QF-2', position: 'team1' },
    { id: 'R16-4', team1: { name: 'I.E. AYUDA MUTUA' }, team2: { name: 'I.E. CIENCIAS' }, nextMatchId: 'QF-2', position: 'team2' },
    { id: 'R16-5', team1: { name: 'I.E. SIMON BOLIVAR' }, team2: { name: 'I.E. URIEL GARCIA' }, nextMatchId: 'QF-3', position: 'team1' },
    { id: 'R16-6', team1: { name: 'I.E. HUANCABAMBA' }, team2: { name: 'I.E. ASHID KUMAR BAHL' }, nextMatchId: 'QF-3', position: 'team2' },
    { id: 'R16-7', team1: { name: 'I.E. ALEJANDRO SANCHEZ ARTEAGA' }, team2: { name: 'I.E. DIEGO QUISPE TITO' }, nextMatchId: 'QF-4', position: 'team1' },
    { id: 'R16-8', team1: { name: 'I.E. SAN FRANCISCO DE BORJA' }, team2: { name: 'I.E. HUMBERTO LUNA' }, nextMatchId: 'QF-4', position: 'team2' },


    // Cuartos
    { id: 'QF-1', team1: null, team2: null, nextMatchId: 'SF-1', position: 'team1' },
    { id: 'QF-2', team1: null, team2: null, nextMatchId: 'SF-1', position: 'team2' },
    { id: 'QF-3', team1: null, team2: null, nextMatchId: 'SF-2', position: 'team1' },
    { id: 'QF-4', team1: null, team2: null, nextMatchId: 'SF-2', position: 'team2' },

    // Semifinales
    { id: 'SF-1', team1: null, team2: null, nextMatchId: 'F-1', position: 'team1' },
    { id: 'SF-2', team1: null, team2: null, nextMatchId: 'F-1', position: 'team2' },

    // Final
    { id: 'F-1', team1: null, team2: null }
  ];

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
