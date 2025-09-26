import { Component, Input, OnInit } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';

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
@Component({
  selector: 'app-standings-table',
  standalone: true,
  imports: [NgClass, NgForOf],
  templateUrl: './standings-table.component.html',
  styleUrls: ['./standings-table.component.scss'],
})
export class StandingsTableComponent implements OnInit {
  @Input() titulo: string = '';
  @Input() grupo: string = '';
  @Input() fecha: string = '';
  @Input() nivel: string = '';
  @Input() typeTeam: string = '';
  @Input() equipos: TeamStanding[]= [];
  ngOnInit() {
  }
}
