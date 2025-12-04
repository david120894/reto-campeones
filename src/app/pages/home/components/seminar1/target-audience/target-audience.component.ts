import { Component } from '@angular/core';
import { NgForOf } from '@angular/common'
interface Audience {
  title: string;
  description: string;
  icon: string;
}
@Component({
  selector: 'app-target-audience',
  imports: [
    NgForOf,
  ],
  templateUrl: './target-audience.component.html',
  styleUrl: './target-audience.component.scss'
})
export class TargetAudienceComponent {
  audiences: Audience[] = [
    {
      title: "Docentes de Educación Física",
      description: "Profesionales de instituciones educativas públicas y privadas",
      icon: "👨‍🏫",
    },
    {
      title: "Técnicos Deportivos",
      description: "Especialistas en entrenamiento y preparación de atletas",
      icon: "🏋️",
    },
    {
      title: "Deportistas",
      description: "De alto rendimiento, calificados, destacados y aspirantes",
      icon: "🏅",
    },
    {
      title: "Dirigentes Deportivos",
      description: "Representantes de federaciones, ligas y clubes",
      icon: "👔",
    },
  ];

  benefits: string[] = [
    "Certificado de participación oficial",
    "Acceso a materiales y recursos educativos",
    "Networking con profesionales del deporte",
    "Herramientas y metodologías actuales",
    "Análisis de casos reales del sector",
    "Articulación con instituciones públicas y privadas",
  ];
}
