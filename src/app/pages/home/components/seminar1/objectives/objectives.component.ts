import { Component } from '@angular/core';
import { NgForOf } from '@angular/common'
interface Objective {
  title: string;
  description: string;
}

@Component({
  selector: 'app-objectives',
  imports: [
    NgForOf,
  ],
  templateUrl: './objectives.component.html',
  styleUrl: './objectives.component.scss'
})
export class ObjectivesComponent {
  objectives: Objective[] = [
    {
      title: "Objetivo General",
      description: "Fortalecer las capacidades de gestión deportiva de los principales actores vinculados al desarrollo del deporte en la región Cusco.",
    },
  ];

  specificObjectives: string[] = [
    "Capacitar sobre gestión de deportistas jóvenes y talentosos",
    "Gestión de recursos económicos e institucionales (patrocinios)",
    "Análisis de casos y problemáticas reales del deporte",
    "Aplicar herramientas y metodologías actuales",
    "Difundir políticas nacionales deportivas vigentes",
  ];
}
