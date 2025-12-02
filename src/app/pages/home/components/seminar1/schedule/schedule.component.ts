import { Component } from '@angular/core';
import { NgForOf } from '@angular/common'
interface Activity {
  time: string;
  activity: string;
  speaker: string;
}

interface DaySchedule {
  day: string;
  activities: Activity[];
}

@Component({
  selector: 'app-schedule',
  imports: [
    NgForOf,
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {
  schedule: DaySchedule[] = [
    {
      day: "Miércoles 10 de diciembre",
      activities: [
        { time: "8:30 - 9:30 am", activity: "Registro e inscripción de participantes ceremonia de inauguración ", speaker: "Comité organizador" },
        { time: "9:30 - 11:00 am", activity: "Funcionamiento del Registro Nacional de Deporte" +
            "Retos y desafíos de la gestión deportiva en el Perú", speaker: "Abg. José Antonio Reyes especialista IPD - Lima" },
        {
          time: "11:15 - 1:00 am",
          activity: 'Gestión deportiva y organización de eventos Análisis de casos',
          speaker: "Lic. Luis Morales Ramon especialista IPD - Lima",
        },
        {
          time: "2:00 - 3:00 pm",
          activity: 'Entrenamiento técnico deportivo en el Centro del Alto Rendimiento (CAR) IPD Cusco',
          speaker: "Lic.  Omar Molina\n" +
            "Técnico deportivo responsable del CAR IPD \n",
        },
        {
          time: "3:00 - 4:00 pm",
          activity: "Nutrición deportiva",
          speaker: "Especialista IPD ",
        },
        {
          time: "4:00 - 5:00 pm",
          activity: "Gestión y Desarrollo de Nuevos Talentos en el Deporte Cusqueño”\n" +
            "Descripción de casos\n",
          speaker: "Club Deportivo Cienciano",
        },
        {
          time: '5:00 - 6:00 pm',
          activity: 'Experiencia deportiva en eventos nacionales e internacionales ',
          speaker: 'Deportista Aydee Loayza Huamán\n' +
            'Deportista Julio Chacón Ordoñez\n',
        },
      ],
    },
    {
      day: "Jueves 11 de diciembre",
      activities: [
        { time: "9:00 - 11:00 am", activity: "La planificación curricular en el marco del CNEB", speaker: "Mgt. Raul Guillermo Cáceres Cairo - Especialista de la UGEL Cusco" },
        {
          time: "11:15 - 1:00 pm",
          activity: "Diseño de Unidades de Aprendizaje: secuencia didáctica, propósito, situación significativa y evaluación",
          speaker: "Mgt. Raul Guillermo Cáceres Cairo - Especialista de la UGEL Cusco",
        },
        { time: "2:30 - 3:30 pm", activity: "Elaboración de Sesiones de Aprendizaje: estructura, estrategias motrices, recursos y gestión del tiempo.", speaker: "Mgt. Raul Guillermo Cáceres Cairo - Especialista de la UGEL Cusco" },
        { time: "3:30 - 4:30 pm", activity: "Proyectos integradores en Educación Física: articulación con otras áreas y enfoques transversales.", speaker: "Mgt. Raul Guillermo Cáceres Cairo - Especialista de la UGEL Cusco" }
      ],
    },
    {
      day: "Viernes 12 de diciembre",
      activities: [
        { time: "12:30 - 01:00 pm", activity: "Elaboración de planificación curricular P.A.", speaker: "Mgt. Raul Guillermo Cáceres Cairo - Especialista de la UGEL Cusco" },
      ],
    },
    {
      day: "Sábado 13 de diciembre",
      activities: [
        {
          time: "9:30 - 04:00 pm",
          activity: "Proyectos de aprendizaje",
          speaker: "Mgt. Raul Guillermo Cáceres Cairo - Especialista de la UGEL Cusco",
        },
      ],
    },
    {
      day: 'Lunes 15 de diciembre',
      activities: [
        {
          time: '9:00 - 04:00 pm',
          activity: 'Revisión y recepción de trabajos',
          speaker: 'Mgt. Raul Guillermo Cáceres Cairo - Especialista de la UGEL Cusco',
        },
      ],
    },
  ];
}
