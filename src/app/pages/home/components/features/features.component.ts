import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../../services/flowbite.service';
import { CommonModule } from '@angular/common';

interface Benefit {
  icon: string;
  title: string;
  description: string;
  color?: string;
}

const NG_MODULES = [CommonModule];

@Component({
  selector: 'app-features',
  imports: [...NG_MODULES],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {
  benefits: Benefit[] = [
    {
      icon: "fas fa-chair",
      title: "Mobiliario",
      description: "Nuestras salas cuentan con sillas ergonómicas American Seating y mesas modulares bipersonales y tripersonales, permitiendo una distribución flexible para cada evento. Esto garantiza comodidad y adaptación a cualquier tipo de conferencia o reunión."
    },
    {
      icon: "fas fa-volume-high",
      title: "Audio y sonido",
      description: "Ofrecemos una calidad de sonido superior con micrófonos digitales y analógicos, micrófonos inalámbricos, además de una consola de audio de 24 canales. Nuestros parlantes y woofers garantizan una excelente acústica."
    },
    {
      icon: "fas fa-video",
      title: "Proyección Multimedia",
      description: "Las salas están equipadas con proyectores de alta resolución XGA, pantallas retráctiles de gran formato y compatibilidad con todos los formatos de video, asegurando presentaciones nítidas y profesionales."
    },
    {
      icon: "far fa-lightbulb",
      title: "Iluminación",
      description: "Disponemos de luces fluorescentes de alta definición, control de intensidad, iluminación de emergencia y decorativa, además de una escenografía con mampostería de piedra que realza el escenario principal."
    },
  ];
}