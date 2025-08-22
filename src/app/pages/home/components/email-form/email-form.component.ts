import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

const NG_MODULES = [ReactiveFormsModule, CommonModule]
export interface Grupo {
  nombre: string;
  colegios: string[];
}

export interface Categoria {
  nombre: string;
  grupos: Grupo[];
}
@Component({
  selector: 'app-email-form',
  standalone: true,
  imports: [...NG_MODULES],
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.scss',
})


export class EmailFormComponent implements OnInit {
  constructor(
  ) {}

  activeIndex: number = 0;

  setActive(index: number) {
    this.activeIndex = index;
  }

  ngOnInit(): void {
  }

  //show schools items
  categorias: Categoria[] = [
    {
      nombre: 'Fútbol Primaria',
      grupos: [
        {
          nombre: 'Grupo A',
          colegios: [
            'I.E. San Cristóbal',
            'I.E. Fortunato L. Herrera',
            'I.E. Inca Garcilaso de la Vega',
            'I.E. Simón Bolívar',
            'I.E. Ashid Kumar Bahal'
          ]
        },
        {
          nombre: 'Grupo B',
          colegios: [
            'I.E. Nuestra Señora de Gracia',
            'I.E. Ayuda Mutua',
            'I.E. Humberto Luna',
            'I.E. Alejandro Sánchez Arteaga',
            'I.E. El Niño Divino'
          ]
        },
        {
          nombre: 'Grupo C',
          colegios: [
            'I.E. San Vicente de Paul',
            'I.E. Ciencias',
            'I.E. San Francisco de Borja',
            'I.E. Diego Quispe Tito',
            'I.E. Uriel García',
          ]
        },
        {
          nombre: 'Grupo D',
          colegios: [
            'I.E. Miguel Grau Seminario',
            'I.E. Mariscal Gamarra',
            'I.E. Dolorespata',
            'I.E. Sagrado Corazón',
            'I.E. Huancabamba',
          ],
        },
      ]
    },
    {
      nombre: 'Fútbol Secundaria',
      grupos: [
        {
          nombre: 'Grupo A',
          colegios: [
            'I.E. Humberto Luna',
            'I.E. 51003 Rosario',
            'I.E. 51004 San Vicente de Paul',
            'I.E. San Francisco de Borja',
            'I.E. Fortunato L. Herrera',
            'I.E. Ciencias'
          ]
        },
        {
          nombre: 'Grupo B',
          colegios: [
            'I.E. Luis Vallejo Santoni',
            'I.E. Diego Quispe Tito',
            'I.E. Miguel Grau Seminario',
            'I.E. Sagrado Corazón de Jesús',
            'I.E. Garcilazo de la Vega',
            'I.E. Uriel García'
          ]
        }
        // ... demás grupos
      ]
    },
    {
      nombre: 'Vóley Primaria',
      grupos: [
        {
          nombre: 'Grupo A',
          colegios: [
            'I.E. Fortunato L. Herrera',
            'I.E. 50707 Simón Bolívar',
            'I.E. 50828 Ashid Kumar Bahal',
            'I.E. Ayuda Mutua',
            'I.E. 51001 Humberto Luna',
            'I.E. Clorinda Matto de Turner'
          ]
        },
        {
          nombre: 'Grupo B',
          colegios: [
            'I.E. El Niño Divino',
            'I.E. Uriel García',
            'I.E. Sagrado Corazón de Jesús',
            'I.E. Miguel Grau Seminario',
            'I.E. Maria de la Merced',
          ]
        }
        // ... demás grupos
      ]
    },
    {
      nombre: 'Vóley Secundaria',
      grupos: [
        {
          nombre: 'Grupo A',
          colegios: [
            'I.E. Clorinda Matto de Turner',
            'I.E. Humberto Luna',
            'I.E. Educandas',
            'I.E. Fortunato L. Herrera',
            'I.E. Comercio 41',
            'I.E. 51003 Rosario',
          ]
        },
        {
          nombre: 'Grupo B',
          colegios: [
            'I.E. Luis Vallejo Santoni',
            'I.E. Uriel García',
            'I.E. Miguel Grau Seminario',
            'I.E. Maria de la Merced',
            'I.E. San Francisco de Borja',
          ]
        }
        // ... demás grupos
      ]
    },
    {
      nombre: 'Ajedrez Primaria',
      grupos: [
        {
          nombre: 'Varones',
          colegios: [
            'I.E. Dolorespata',
            'I.E. Daniel Estrada Pérez',
            'I.E. Alejandro Sánchez Arteaga',
            'I.E. Niño Divino',
            'I.E. San Francisco de Borja',
            'I.E. Sagrado Corazón de Jesús',
            'I.E. Nuestra Señora de Gracia',
            'I.E. Fe y Alegría N° 20',
            'I.E. Mariscal Gamarra',
            'I.E. Humberto Luna',
            'I.E. Garcilazo',
            'I.E. Ciencias',
          ],
        },
        {
          nombre: 'Mujeres',
          colegios: [
            'I.E. Mariscal Gamarra',
            'I.E. Sagrado Corazón de Jesús',
            'I.E. Fe y Alegría N° 20',
            'I.E. Niño Divino',
            'I.E. Humberto Luna',
          ],
        },
        // ... demás grupos
      ],
    },
    {
      nombre: 'Ajedrez Secundaria',
      grupos: [
        {
          nombre: 'Mujeres',
          colegios: [
            'I.E. Comercio 41',
            'I.E. Fe y Alegría N° 20',
            'I.E. Sagrado Corazón de Jesús',
          ],
        },
        {
          nombre: 'Varones',
          colegios: [
            'I.E. Luis Vallejo Santoni',
            'I.E. Fe y Alegría N° 20',
            'I.E. Sagrado Corazón de Jesús',
          ],
        },
        // ... demás grupos
      ],
    },
  ];

  // categoría activa
}
