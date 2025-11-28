import { Component } from '@angular/core';
import { NgForOf } from '@angular/common'
interface Module {
  title: string;
  duration: string;
  content: string;
  activities: string[];
}

@Component({
  selector: 'app-modules',
  imports: [
    NgForOf,
  ],
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.scss'
})
export class ModulesComponent {
  modules: Module[] = [
    {
      title: "Introducción y Fundamentos Teóricos",
      duration: "15 horas",
      content: "Conceptos clave, marco conceptual, historia y terminología de la gestión deportiva.",
      activities: ["Debate guiado", "Ensayo corto"],
    },
    {
      title: "Metodologías Actuales",
      duration: "15 horas",
      content: "Métodos, herramientas y tendencias contemporáneas en gestión deportiva.",
      activities: ["Debate guiado", "Ensayo corto"],
    },
    {
      title: "Aplicación Práctica y Resolución de Casos",
      duration: "15 horas",
      content: "Análisis de casos reales, talleres prácticos y estudio de campo.",
      activities: ["Análisis de lecturas", "Talleres prácticos"],
    },
    {
      title: "Enfoque y Metodologías de Aplicación",
      duration: "15 horas",
      content: "Casos reales, simulaciones y estudio de campo práctico.",
      activities: ["Trabajo grupal", "Presentaciones"],
    },
    {
      title: "Diseño de Proyecto o Propuesta Final",
      duration: "15 horas",
      content: "Elaboración de un proyecto o intervención aplicada en gestión deportiva.",
      activities: ["Proyecto aplicado", "Tutoría"],
    },
    {
      title: "Evaluación y Retroalimentación",
      duration: "15 horas",
      content: "Presentación de proyectos, autoevaluación y cierre del seminario.",
      activities: ["Exposición final", "Informe final"],
    },
  ];
}
