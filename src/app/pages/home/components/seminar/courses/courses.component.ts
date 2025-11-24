import { Component } from '@angular/core'
import { NgForOf } from '@angular/common'

interface AgeGroup {
  age: string;
  groups: CourseGroup[];
}

interface CourseGroup {
  category: string;
  schedule: string;
  time: string;
  disciplines: string[];
}

@Component({
  selector: 'app-courses',
  imports: [
    NgForOf,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {

  ageGroups: AgeGroup[] = [
    {
      age: "6-9 AÑOS",
      groups: [
        {
          category: "CULTURAL",
          schedule: "Lunes-Miércoles",
          time: "8:00 am - 1:00 pm",
          disciplines: ["Ballet", "Música Canto", "Dibujo, Pintura y Manualidad"],
        },
        {
          category: "DEPORTIVO",
          schedule: "Martes-Jueves",
          time: "8:00 am - 1:00 pm",
          disciplines: ["Fútbol", "Vóley", "Ajedrez", "Karate", "Básquet", "Gimnasia Rítmica", "Atletismo", "Ciclismo"],
        },
        {
          category: "DE DESARROLLO",
          schedule: "Viernes",
          time: "8:00 am - 1:00 pm",
          disciplines: ["Mini Periodistas (Oratoria y Liderazgo)", "Mini Guía de Turismo", "Mini Científicos"],
        },
      ],
    },
    {
      age: "10-12 AÑOS",
      groups: [
        {
          category: "CULTURAL",
          schedule: "Martes-Jueves",
          time: "8:00 am - 1:00 pm",
          disciplines: ["Danza Contemporánea (Marinera)", "Música Canto", "Dibujo, Pintura y Manualidad"],
        },
        {
          category: "DEPORTIVO",
          schedule: "Lunes-Miércoles",
          time: "8:00 am - 1:00 pm",
          disciplines: ["Fútbol", "Vóley", "Ajedrez", "Karate", "Básquet", "Gimnasia Rítmica", "Atletismo", "Ciclismo"],
        },
        {
          category: "DE DESARROLLO",
          schedule: "Viernes",
          time: "8:00 am - 1:00 pm",
          disciplines: ["Robótica"],
        },
      ],
    },
    {
      age: "13-16 AÑOS",
      groups: [
        {
          category: "CULTURAL",
          schedule: "Martes-Jueves",
          time: "8:00 am - 1:00 pm",
          disciplines: ["Danza Urbana", "Música Canto", "Dibujo, Pintura y Manualidad"],
        },
        {
          category: "DEPORTIVO",
          schedule: "Lunes-Miércoles",
          time: "8:00 am - 1:00 pm",
          disciplines: ["Fútbol", "Vóley", "Ajedrez", "Karate", "Básquet", "Gimnasia Rítmica", "Atletismo", "Ciclismo"],
        },
        {
          category: "DE DESARROLLO",
          schedule: "Viernes",
          time: "8:00 am - 1:00 pm",
          disciplines: ["Robótica"],
        },
      ],
    },
  ];

  categoryColors: { [key: string]: { badge: string; bg: string } } = {
    CULTURAL: { badge: "bg-purple-100 text-purple-800", bg: "border-purple-200" },
    DEPORTIVO: { badge: "bg-orange-100 text-orange-800", bg: "border-orange-200" },
    "DE DESARROLLO": { badge: "bg-blue-100 text-blue-800", bg: "border-blue-200" },
  };

  getCategoryColors(category: string) {
    return this.categoryColors[category] || { badge: "bg-gray-100 text-gray-800", bg: "border-gray-200" };
  }
}
