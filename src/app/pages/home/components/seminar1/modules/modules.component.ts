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
      title: "Funcionamiento Registro nacional de deporte",
      duration: "15 horas",
      content: "Conceptos clave, marco conceptual, historia y terminología.",
      activities: ["Debate guiado", "Ensayo corto"],
    },
    {
      title: "Gestión deportiva y organización de eventos ",
      duration: "15 horas",
      content: "Métodos, herramientas, tendencias.",
      activities: ["Debate guiado", "Ensayo corto"],
    },
    {
      title: "Planificación curricular en el marco del CNEB; niveles de concreción (PEI, PCI Modulo programación anual: criterios distribución de competencias y calendarización de unidades",
      duration: "15 horas",
      content: "Métodos, herramienta, tendencia.",
      activities: ["Análisis de lecturas talleres prácticos"],
    },
    {
      title: "Diseño de unidades de aprendizaje secuencias: didáctica, propósito, situación significativa a y evaluación",
      duration: "15 horas",
      content: "Casos reales, simulaciones y estudio de campo.",
      activities: ["Trabajo grupal", "Presentaciones"],
    },
    {
      title: "Elaboración de sesiones de aprendizaje: estructura, estrategias motrices, recursos y gestión del tiempo",
      duration: "15 horas",
      content: "Elaboración de un proyecto o intervención.",
      activities: ["Proyecto aplicado tutoría"],
    },
    {
      title: "Proyectos integrados en educación física: articulación con otras áreas y enfoques transversales.",
      duration: "15 horas",
      content: "Presentación de proyectos autoevaluación.",
      activities: ["Exposición final", "Informe final"],
    },
    {
      title: "Elaboración de la planificación curricular",
      duration: "15 horas",
      content: "Métodos, herramienta, tendencia.",
      activities: ["Exposición final", "Informe final"],
    },
    {
      title: "Proyectos de aprendizaje",
      duration: "15 horas",
      content: "Métodos, herramienta, tendencia.",
      activities: ["Exposición final", "Informe final"],
    }
  ];
}
