import { Component } from '@angular/core';
import { NgForOf } from '@angular/common'
interface Feature {
  title: string;
  description: string;
}

@Component({
  selector: 'app-features',
  imports: [
    NgForOf,
  ],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      title: 'Docentes Certificados',
      description: 'Profesionales con experiencia en educación y especialización en cada área'
    },
    {
      title: 'Métodos Innovadores',
      description: 'Aprendizaje basado en proyectos reales y actividades prácticas'
    },
    {
      title: 'Pequeños Grupos',
      description: 'Máximo 15 estudiantes por clase para atención personalizada'
    },
    {
      title: 'Certificado Oficial',
      description: 'Reconocimiento válido al completar cada curso'
    },
    {
      title: 'Horarios Flexibles',
      description: 'Sesiones en la mañana, tarde y fin de semana'
    },
    {
      title: 'Acceso Digital',
      description: 'Plataforma online con recursos y materiales descargables'
    }
  ];
}
