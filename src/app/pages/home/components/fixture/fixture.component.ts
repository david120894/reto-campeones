import { Component, Input, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgIf, SlicePipe } from '@angular/common'

interface Partido {
  fecha: string;
  equipo1: string;
  equipo2: string;
  marcador?: string;
  hora?: string;
  cat1?: string;
  cat2?: string;
}

interface Grupo {
  nombre: string;
  color: string;
  partidos: Partido[];
}

interface GrupoConFechas {
  nombre: string;
  color: string;
  fechas: { fecha: string; partidos: Partido[]; abierto: boolean }[];
}

@Component({
  selector: 'app-fixture',
  imports: [
    NgForOf,
    NgClass,
    SlicePipe,
    NgIf,

  ],
  templateUrl: './fixture.component.html',
  styleUrl: './fixture.component.scss',
})
export class FixtureComponent implements OnInit {

  @Input() typeSection!: string;

  activeTab: 'primariaFutbol' |'primariaVoley'|'secundariaVoley'| 'secundariaFutbol' = 'primariaFutbol';

  setTab(tab: 'primariaFutbol' | 'secundariaFutbol'| 'primariaVoley'| 'secundariaVoley') {
    this.activeTab = tab;
    this.initFutbol();
  }

  gruposConFechas: GrupoConFechas[] = [];

  ngOnInit() {
    this.initFutbol();
  }

  getGroups()  {

    return this.gruposConFechas;
  }
  initFutbol() {

    const groupType: Record<string, Grupo[]> = {
      primariaFutbol: this.gruposPrimaria,
      secundariaFutbol: this.gruposSecundaria,
      primariaVoley: this.gruposPrimariaVoley,
      secundariaVoley: this.gruposSecundariaVoley
    }

    const sourceGrupos = groupType[this.activeTab] || []

    this.gruposConFechas = sourceGrupos.map(grupo => {
      const fechasMap: { [key: string]: Partido[] } = {};

      grupo.partidos.forEach(p => {
        if (!fechasMap[p.fecha]) {
          fechasMap[p.fecha] = [];
        }
        fechasMap[p.fecha].push(p);
      });
      const keys = Object.keys(fechasMap);

      const fechas = keys.map((fecha, i) => ({
        fecha,
        partidos: fechasMap[fecha],
        abierto: i === keys.length - 1,
      }));
      return {
        nombre: grupo.nombre,
        color: grupo.color,
        fechas,
      };
    });
  }
  gruposPrimaria: Grupo[] = [
    {
      nombre: 'Grupo A',
      color: 'bg-blue-600',
      partidos: [
        { fecha: '23 de agosto', equipo1: 'I.E. Fortunato L. Herrera', equipo2: 'I.E. Simón Bolívar' },
        { fecha: '23 de agosto', equipo1: 'I.E. Inca Garcilaso de la Vega', equipo2: 'I.E. Ashid Kumar Bahal' },

        { hora:'10:20', fecha: '06 de septiembre', equipo1: 'I.E. San Cristóbal', equipo2: 'I.E. Inca Garcilaso de la Vega' },
        { hora: '11:00', fecha: '06 de septiembre', equipo1: 'I.E. Ashid Kumar Bahal', equipo2: 'I.E. San Francisco de Borja' },

        {
          hora: '11:40',
          fecha: '13 de septiembre',
          equipo1: 'I.E. San Francisco de Borja',
          equipo2: 'I.E. San Cristóbal',
        },
        { hora: '12:20', fecha: '13 de septiembre', equipo1: 'I.E. Ashid Kumar Bahal', equipo2: 'I.E. Simón Bolívar' },

        { hora:'09:00',fecha: '20 de septiembre', equipo1: 'I.E. San Cristóbal', equipo2: 'I.E. Ashid Kumar Bahal' },
        { hora:'09:40',fecha: '20 de septiembre', equipo1: 'I.E. Inca Garcilaso de la Vega', equipo2: 'I.E. Simón Bolívar' },

        { hora:'10:20',fecha: '27 de septiembre', equipo1: 'I.E. San Francisco de Borja', equipo2: 'I.E. Inca Garcilaso de la Vega' },
        { hora:'11:00',fecha: '27 de septiembre', equipo1: 'I.E. Simón Bolívar', equipo2: 'I.E. San Cristóbal'  },

      ],
    },
    {
      nombre: 'Grupo B',
      color: 'bg-green-600',
      partidos: [
        { fecha: '23 de agosto', equipo1: 'I.E. Nuestra Señora de Gracia', equipo2: 'I.E. Alejandro Sánchez Arteaga' },
        { fecha: '23 de agosto', equipo1: 'I.E. Ayuda Mutua', equipo2: 'I.E. El Niño Divino' },

        { hora:'11:40',fecha: '06 de septiembre', equipo1: 'I.E. Alejandro Sánchez Arteaga', equipo2: 'I.E. Humberto Luna' },
        { hora:'12:20',fecha: '06 de septiembre', equipo1: 'I.E. El Niño Divino', equipo2: 'I.E. Nuestra Señora de Gracia' },

        { hora: '09:00', fecha: '13 de septiembre', equipo1: 'I.E. Ayuda Mutua', equipo2: 'I.E. Humberto Luna' },
        {
          hora: '09:40',
          fecha: '13 de septiembre',
          equipo1: 'I.E. El Niño Divino',
          equipo2: 'I.E. Alejandro Sánchez Arteaga',
        },

        { hora:'13:00',fecha: '20 de septiembre', equipo1: 'I.E. Ayuda Mutua', equipo2: 'I.E. Alejandro Sánchez Arteaga' },
        { hora:'13:40',fecha: '20 de septiembre', equipo1: 'I.E. Humberto Luna', equipo2: 'I.E. Nuestra Señora de Gracia' },

        { hora: '09:00', fecha: '27 de septiembre', equipo1: 'I.E. Nuestra Señora de Gracia', equipo2: 'I.E. Ayuda Mutua' },
        { hora: '09:40', fecha: '27 de septiembre', equipo1: 'I.E. El Niño Divino', equipo2: 'I.E. Humberto Luna' },
      ],
    },
    {
      nombre: 'Grupo C',
      color: 'bg-red-600',
      partidos: [
        { fecha: '23 de agosto', equipo1: 'I.E. San Vicente de Paul', equipo2: 'I.E. Diego Quispe Tito' },
        { fecha: '23 de agosto', equipo1: 'I.E. Ciencias', equipo2: 'I.E. Uriel García' },
        { fecha: '23 de agosto', equipo1: 'I.E. San Francisco de Borja', equipo2: 'I.E. Red de Colegios Kancharisum' },

        { hora:'13:00',fecha: '06 de septiembre', equipo1: 'I.E. Red de Colegios Kancharisum', equipo2: 'I.E. Ciencias' },
        { hora:'13:40',fecha: '06 de septiembre', equipo1: 'I.E. Uriel García', equipo2: 'I.E. San Vicente de Paul' },

        {
          hora: '13:00',
          fecha: '13 de septiembre',
          equipo1: 'I.E. San Vicente de Paul',
          equipo2: 'I.E. Red de Colegios Kancharisum',
        },
        { hora: '13:40', fecha: '13 de septiembre', equipo1: 'I.E. Uriel García', equipo2: 'I.E. Diego Quispe Tito' },

        // { fecha: '6 de septiembre', equipo1: 'I.E. Ciencias', equipo2: 'I.E. San Francisco de Borja' },
        // { fecha: '6 de septiembre', equipo1: 'I.E. Uriel García', equipo2: 'I.E. Diego Quispe Tito' },
        { hora:"10:20", fecha: '20 de septiembre', equipo1: 'I.E. Red de Colegios Kancharisum', equipo2: 'I.E. Uriel García' },
        { hora:"11:00", fecha: '20 de septiembre', equipo1: 'I.E. Ciencias', equipo2: 'I.E. Diego Quispe Tito' },
        // { fecha: '13 de septiembre', equipo1: 'I.E. San Francisco de Borja', equipo2: 'I.E. San Vicente de Paul' },
        { hora:'11:40', fecha: '27 de septiembre', equipo1: 'I.E. San Vicente de Paul', equipo2: 'I.E. Ciencias' },
        { hora:'12:20', fecha: '27 de septiembre', equipo1: 'I.E. Diego Quispe Tito', equipo2: 'I.E. Red de Colegios Kancharisum' },
        // { fecha: '20 de septiembre', equipo1: 'I.E. Uriel García', equipo2: 'I.E. San Francisco de Borja' },
      ],
    },
    {
      nombre: 'Grupo D',
      color: 'bg-purple-600',
      partidos: [
        { fecha: '23 de agosto', equipo1: 'I.E. Dolores Pata', equipo2: 'I.E. Huancabamba' },
        { fecha: '23 de agosto', equipo1: 'I.E. Sagrado Corazón', equipo2: 'I.E. Miguel Grau Seminario' },

        { hora:'09:00',fecha: '06 de septiembre', equipo1: 'I.E. Miguel Grau Seminario', equipo2: 'I.E. Dolores Pata' },
        { hora:'09:40',fecha: '06 de septiembre', equipo1: 'I.E. Huancabamba', equipo2: 'I.E. Mariscal Gamarra' },

        {
          hora: '10:20',
          fecha: '13 de septiembre',
          equipo1: 'I.E. Mariscal Gamarra',
          equipo2: 'I.E. Miguel Grau Seminario',
        },
        { hora: '11:00', fecha: '13 de septiembre', equipo1: 'I.E. Dolores Pata', equipo2: 'I.E. Sagrado Corazón' },


        { hora:"11:40",fecha: '20 de septiembre', equipo1: 'I.E. Miguel Grau Seminario', equipo2: 'I.E. Huancabamba' },
        { hora:"12:20",fecha: '20 de septiembre', equipo1: 'I.E. Sagrado Corazón', equipo2: 'I.E. Mariscal Gamarra' },

        { hora:'13:00', fecha: '27 de septiembre', equipo1: 'I.E. Mariscal Gamarra', equipo2: 'I.E. Dolores Pata' },
        { hora:'13:40', fecha: '27 de septiembre', equipo1: 'I.E. Huancabamba', equipo2: 'I.E. Sagrado Corazón' },
      ],
    },
  ];
  gruposSecundaria: Grupo[] = [
    {
      nombre: 'Grupo A',
      color: 'bg-blue-600',
      partidos: [
        { fecha: '23 de agosto', equipo1: 'I.E. 51003 Rosario', equipo2: 'I.E. Fortunato L. Herrera' },
        { fecha: '23 de agosto', equipo1: 'I.E. 51004 San Vicente de Paul', equipo2: 'I.E. Ciencias' },
        { fecha: '23 de agosto', equipo1: 'I.E. San Francisco de Borja', equipo2: 'I.E. Humberto Luna' },

        { hora:'12:00', fecha: '06 de septiembre', equipo1: 'I.E. Humberto Luna', equipo2: 'I.E. 51004 San Vicente de Paul' },
        { hora:'13:00', fecha: '06 de septiembre', equipo1: 'I.E. Ciencias', equipo2: 'I.E. 51003 Rosario' },

        { hora: '12:00', fecha: '13 de septiembre', equipo1: 'I.E. Ciencias', equipo2: 'I.E. San Francisco de Borja' },
        { hora: '13:00', fecha: '13 de septiembre', equipo1: 'I.E. 5100 Rosario', equipo2: 'I.E. San Vicente de Paul' },

        { hora:"12:00", fecha: '20 de septiembre', equipo1: 'I.E. San Francisco de Borja', equipo2: 'I.E. 51003 Rosario' },
        { hora:"13:00", fecha: '20 de septiembre', equipo1: 'I.E. Humberto Luna', equipo2: 'I.E. Ciencias' },
        // { fecha: '13 de septiembre', equipo1: 'I.E. 51004 San Vicente de Paul', equipo2: 'I.E. Fortunato L. Herrera' },
        //
        { hora:'12:00', fecha: '27 de septiembre', equipo1: 'I.E. 51003 Rosario', equipo2: 'I.E. Humberto Luna' },
        { hora:'13:00', fecha: '27 de septiembre', equipo1: 'I.E. San Vicente de Paul', equipo2: 'I.E. San Francisco de Borja' },
        // { fecha: '20 de septiembre', equipo1: 'I.E. Ciencias', equipo2: 'I.E. San Francisco de Borja' },
      ],
    },
    {
      nombre: 'Grupo B',
      color: 'bg-green-600',
      partidos: [
        { fecha: '23 de agosto', equipo1: 'I.E. Diego Quispe Tito', equipo2: 'I.E. Sagrado Corazón de Jesús' },
        { fecha: '23 de agosto', equipo1: 'I.E. Uriel García', equipo2: 'I.E. Garcilazo de la Vega' },
        { fecha: '23 de agosto', equipo1: 'I.E. Miguel Grau Seminario', equipo2: 'I.E. Luis Vallejo Santoni' },

        { hora:'09:00',fecha: '06 de septiembre', equipo1: 'I.E. Garcilazo de la Vega', equipo2: 'I.E. Diego Quispe Tito' },
        { hora:'10:00',fecha: '06 de septiembre', equipo1: 'I.E. Sagrado Corazón de Jesús', equipo2: 'I.E. Miguel Grau Seminario' },
        { hora:'11:00',fecha: '06 de septiembre', equipo1: 'I.E. Luis Vallejo Santoni', equipo2: 'I.E. Uriel García' },
        //
        {
          hora: '09:00',
          fecha: '13 de septiembre',
          equipo1: 'I.E. Garcilazo de la Vega',
          equipo2: 'I.E. Sagrado Corazón de Jesús',
        },
        {
          hora: '10:00',
          fecha: '13 de septiembre',
          equipo1: 'I.E. Uriel García',
          equipo2: 'I.E. Miguel Grau Seminario',
        },
        {
          hora: '11:00',
          fecha: '13 de septiembre',
          equipo1: 'I.E. Diego Quispe Tito',
          equipo2: 'I.E. Luis Vallejo Santoni',
        },
        //
        { hora:"09:00", fecha: '20 de septiembre', equipo1: 'I.E. Luis Vallejo Santoni', equipo2: 'I.E. Garcilazo de la Vega' },
        { hora:"10:00", fecha: '20 de septiembre', equipo1: 'I.E. Uriel García', equipo2: 'I.E. Sagrado Corazón de Jesús' },
        { hora:"11:00", fecha: '20 de septiembre', equipo1: 'I.E. Miguel Grau Seminario', equipo2: 'I.E. Diego Quispe Tito' },
        //
        { hora:'09:00',  fecha: '27 de septiembre', equipo1: 'I.E. Diego Quispe Tito', equipo2: 'I.E. Uriel García' },
        { hora:'10:00',  fecha: '27 de septiembre', equipo1: 'I.E. Sagrado Corazón de Jesús', equipo2: 'I.E. Luis Vallejo Santoni' },
        { hora:'11:00',  fecha: '27 de septiembre', equipo1: 'I.E. Garcilazo de la Vega', equipo2: 'I.E. Miguel Grau Seminario' },
      ],
    },
  ];
  gruposPrimariaVoley: Grupo[] = [
    {
      nombre: 'Grupo A',
      color: 'bg-blue-600',
      partidos: [
        // FECHA 1 - 23 DE AGOSTO
        { fecha: '23 de agosto', equipo1: 'I.E. 50707 Simón Bolívar', equipo2: 'I.E. 51001 Humberto Luna' },
        { fecha: '23 de agosto', equipo1: 'I.E. 50828 Ashid Kumar Bahal', equipo2: 'I.E. Clorinda Matto de Turner' },
        { fecha: '23 de agosto', equipo1: 'I.E. 50966 Virgen Rosario (Ayuda Mutua)', equipo2: 'I.E. Fortunato L. Herrera' },

        // // FECHA 2 - 06 DE AGOSTO
        { hora:'10:20', fecha: '06 de septiembre', equipo1: 'I.E. 51001 Humberto Luna', equipo2: 'I.E. 50966 Virgen Rosario (Ayuda Mutua)' },
        { hora:'11:00', fecha: '06 de septiembre', equipo1: 'I.E. Clorinda Matto de Turner', equipo2: 'I.E. 50828 Simon Bolívar' },

        // // FECHA 3 - 06 DE SEPTIEMBRE
        {
          hora: '09:30',
          fecha: '13 de septiembre',
          equipo1: 'I.E. 50707 Clorinda Matto de Turner',
          equipo2: 'I.E. Humberto Luna',
        },
        {
          hora: '10:10',
          fecha: '13 de septiembre',
          equipo1: 'I.E. 50828 Ashid Kumar Bahal',
          equipo2: 'I.E. 50966 Virgen Rosario (Ayuda Mutua)',
        },
        // { fecha: '6 de septiembre', equipo1: 'I.E. Clorinda Matto de Turner', equipo2: 'I.E. 51001 Humberto Luna' },
        //
        // // FECHA 4 - 13 DE SEPTIEMBRE

        // { fecha: '13 de septiembre', equipo1: 'I.E. 50966 Virgen Rosario (Ayuda Mutua)', equipo2: 'I.E. 50707 Simón Bolívar' },
        //
        // // FECHA 5 - 20 DE SEPTIEMBRE
        { hora:"10:20",fecha: '20 de septiembre', equipo1: 'I.E. Clorinda Matto de Turner', equipo2: 'I.E. 50966 Virgen Rosario (Ayuda Mutua)' },
        { hora:"11:00",fecha: '20 de septiembre', equipo1: 'I.E. 50707 Simón Bolívar', equipo2: 'I.E. 50828 Ashid Kumar Bahal' },

        { hora:'09:30', fecha: '27 de septiembre', equipo1: 'I.E. Miguel Grau Seminario', equipo2: 'I.E. Uriel García' },
        { hora:'10:10', fecha: '27 de septiembre', equipo1: 'I.E. Sagrado Corazón de Jesús', equipo2: 'I.E. Maria de la Merced' },
        // { fecha: '20 de septiembre', equipo1: 'I.E. 51001 Humberto Luna', equipo2: 'I.E. Fortunato L. Herrera' },
      ],
    },
    {
      nombre: 'Grupo B',
      color: 'bg-green-600',
      partidos: [
        // FECHA 1 - 23 DE AGOSTO
        { fecha: '23 de agosto', equipo1: 'I.E. Uriel García', equipo2: 'I.E. María de la Merced' },
        { fecha: '23 de agosto', equipo1: 'I.E. Miguel Grau Seminario', equipo2: 'I.E. El Niño Divino' },
        { fecha: '23 de agosto', equipo1: 'I.E. Sagrado Corazón de Jesús', equipo2: '' },

        // // FECHA 2 - 06 DE AGOSTO
        { hora:'09:00', fecha: '06 de septiembre', equipo1: 'I.E. El Niño Divino', equipo2: 'I.E. Sagrado Corazón de Jesús' },
        { hora:'09:40', fecha: '06 de septiembre', equipo1: 'I.E. María de la Merced', equipo2: 'I.E. Miguel Grau Seminario' },
        // { fecha: '06 de agosto', equipo1: 'I.E. Uriel García', equipo2: '' },
        //
        // // FECHA 3 - 06 DE SEPTIEMBRE
        { hora: '10:50', fecha: '13 de septiembre', equipo1: 'I.E. Uriel García', equipo2: 'I.E. El Niño Divino' },
        {
          hora: '11:30',
          fecha: '13 de septiembre',
          equipo1: 'I.E. Sagrado Corazón de Jesús',
          equipo2: 'I.E. Miguel Grau Seminario',
        },
        // { fecha: '6 de septiembre', equipo1: 'I.E. María de la Merced', equipo2: '' },
        //
        // // FECHA 4 - 13 DE SEPTIEMBRE
        // { fecha: '13 de septiembre', equipo1: 'I.E. El Niño Divino', equipo2: '' },
        //
        // // FECHA 5 - 20 DE SEPTIEMBRE
        { hora:"09:00",fecha: '20 de septiembre', equipo1: 'I.E. Uriel García', equipo2: 'I.E. Sagrado Corazón de Jesús' },
        { hora:"09:40",fecha: '20 de septiembre', equipo1: 'I.E. María de la Merced', equipo2: 'I.E. El Niño Divino' },
        // { fecha: '20 de septiembre', equipo1: 'I.E. Miguel Grau Seminario', equipo2: '' },

        { hora:'10:50',fecha: '27 de septiembre', equipo1: 'I.E. 50966 Virgen Rosario (Ayuda Mutua)', equipo2: 'I.E. 50707 Simón Bolívar' },
        { hora:'11:30',fecha: '27 de septiembre', equipo1: 'I.E. 50828 Ashid Kumar Bahal', equipo2: 'I.E. 51001 Humberto Luna' },
      ],
    },
  ];
  gruposSecundariaVoley: Grupo[] = [
    {
      nombre: 'Grupo A',
      color: 'bg-blue-600',
      partidos: [
        // FECHA 1 - 23 DE AGOSTO
        { fecha: '23 de agosto', equipo1: 'I.E. Humberto Luna', equipo2: 'I.E. Comercio 41' },
        { fecha: '23 de agosto', equipo1: 'I.E. Fortunato L. Herrera', equipo2: 'I.E. Clorinda Matto de Turner' },
        { fecha: '23 de agosto', equipo1: 'I.E. Educandas', equipo2: 'I.E. 51003 Rosario' },

        // // FECHA 2 - 06 DE AGOSTO
        { hora:'11:00', fecha: '06 de septiembre', equipo1: 'I.E.  Educandas', equipo2: 'I.E. Comercio 41' },
        { hora:'11:40', fecha: '06 de septiembre', equipo1: 'I.E. Clorinda Matto de Turner', equipo2: 'I.E. 51003 Rosario' },
        //
        // { hora:'11:40', fecha: '06 de agosto', equipo1: 'I.E. Fortunato L. Herrera', equipo2: 'I.E. Humberto Luna' },
        // // FECHA 3 - 06 DE SEPTIEMBRE
        { hora:'08:30', fecha: '13 de septiembre', equipo1: 'I.E. Clorinda Matto de Turner', equipo2: 'I.E. Rosario' },
        { hora: '09:30', fecha: '13 de septiembre', equipo1: 'I.E. Humberto Luna', equipo2: 'I.E. Clorinda Matto de Turner'},
        { hora: '10:20', fecha: '13 de septiembre', equipo1: 'I.E. Comercio 41', equipo2: 'I.E. 51003 Rosario' },

        // // FECHA 4 - 13 DE SEPTIEMBRE
        { hora:"09:00",fecha: '20 de septiembre', equipo1: 'I.E. Maria de la Merced', equipo2: 'I.E. Uriel García' },
        { hora:"09:50",fecha: '20 de septiembre', equipo1: 'I.E. Luis Vallejo Antoni', equipo2: 'I.E. Sagrado Corazón de Jesús' },
        // { fecha: '13 de septiembre', equipo1: 'I.E. Clorinda Matto de Turner', equipo2: 'I.E. 51003 Rosario' },

        // // FECHA 5 - 20 DE SEPTIEMBRE
        { hora: '08:30',fecha: '27 de septiembre', equipo1: 'I.E. Educandas', equipo2: 'I.E. Comercio 41' },
        { hora: '09:30',fecha: '27 de septiembre', equipo1: 'I.E. Clorinda Matto de Turner', equipo2: 'I.E. Educandas' },
        { hora: '10:20',fecha: '27 de septiembre', equipo1: 'I.E. Humberto Luna', equipo2: 'I.E. 51003 Rosario' },
        // { fecha: '20 de septiembre', equipo1: 'I.E. Fortunato L. Herrera', equipo2: 'I.E. 51003 Rosario' },
      ],
    },
    {
      nombre: 'Grupo B',
      color: 'bg-green-600',
      partidos: [
        // FECHA 1 - 23 DE AGOSTO
        { fecha: '23 de agosto', equipo1: 'I.E. Uriel García', equipo2: 'I.E. San Francisco de Borja' },
        { fecha: '23 de agosto', equipo1: 'I.E. María de la Merced', equipo2: 'I.E. Luis Vallejo Santoni' },
        { fecha: '23 de agosto', equipo1: 'I.E. Miguel Grau Seminario', equipo2: '' },

        // // FECHA 2 - 06 DE AGOSTO
        { hora:'09:00', fecha: '06 de septiembre', equipo1: 'I.E. Luis Vallejo Santoni', equipo2: 'I.E. Miguel Grau Seminario' },
        { hora:'09:40', fecha: '06 de septiembre', equipo1: 'I.E. San Francisco de Borja', equipo2: 'I.E. María de la Merced' },
        { hora:'10:20', fecha: '06 de septiembre', equipo1: 'I.E. Uriel García', equipo2: 'I.E. Sagrado Corazón de Jesús' },
        //
        // // FECHA 3 - 06 DE SEPTIEMBRE
        { hora: '08:30', fecha: '13 de septiembre', equipo1: 'I.E. Miguel Grau Seminario', equipo2: 'I.E. Sagrado Corazón de Jesús'},
        { hora: '11:10', fecha: '13 de septiembre', equipo1: 'I.E. Miguel Grau Seminario', equipo2: 'I.E. María de la Merced'},
        { hora: '12:00', fecha: '13 de septiembre', equipo1: 'I.E. San Francisco de Borja', equipo2: 'I.E. Sagrdo Corazón de Jesús'},
        { hora: '12:50', fecha: '13 de septiembre', equipo1: 'I.E. Uriel García', equipo2: 'I.E. Luis Vallejo Santoni'},
        //
        // // FECHA 4 - 13 DE SEPTIEMBRE
        { hora:"10:40",fecha: '20 de septiembre', equipo1: 'I.E. Comercio 41', equipo2: 'I.E. Clorinda Matto de Turner' },
        { hora:"11:30",fecha: '20 de septiembre', equipo1: 'I.E. Humberto Luna', equipo2: 'I.E. Educandas' },
        // { fecha: '13 de septiembre', equipo1: 'I.E. Luis Vallejo Santoni', equipo2: '' },
        //
        // // FECHA 5 - 20 DE SEPTIEMBRE
        { hora:'08:30', fecha: '27 de septiembre', equipo1: 'I.E. Miguel Grau Seminario', equipo2: 'I.E. San Francisco de Borja' },
        { hora:'11:10', fecha: '27 de septiembre', equipo1: 'I.E. San Francisco de Borja', equipo2: 'I.E. Luis Vallejo Santoni' },
        { hora:'12:00', fecha: '27 de septiembre', equipo1: 'I.E. Uriel García', equipo2: 'I.E. Miguel Grau Seminario' },
        { hora:'12:50', fecha: '27 de septiembre', equipo1: 'I.E. María de la Merced', equipo2: 'Sagrado Corazón de Jesús' },
      ],
    },
  ];




}
