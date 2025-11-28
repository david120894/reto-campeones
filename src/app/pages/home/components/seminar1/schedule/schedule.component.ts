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
        { time: "8:30 - 9:00 am", activity: "Registro e inscripción de participantes", speaker: "Comité organizador" },
        { time: "9:00 - 9:30 am", activity: "Ceremonia de inauguración", speaker: "Comité organizador" },
        {
          time: "9:30 - 11:00 am",
          activity: '"Funcionamiento del Registro Nacional de Deporte"',
          speaker: "Abg. José Antonio Reyes - IPD",
        },
        {
          time: "11:15 - 1:00 pm",
          activity: 'Gestión deportiva y organización de eventos"',
          speaker: "Lic. Luis Morales Ramon IPD",
        },
        {
          time: "2:30 - 3:30 pm",
          activity: "Entrenamiento técnico deportivo en el CAR -Cusco",
          speaker: "Omar Molina ",
        },
        {
          time: "3:30 - 4:30 pm",
          activity: "Entrenamiento psicológico del CAR Cusco",
          speaker: "Club Cienciano",
        },
        {
          time: '4:30 - 5:30 pm',
          activity: 'Experiencia deportiva',
          speaker: 'Ayde Loayza Huamán' +
            'Julio Chacón  Ordoñez',
        },
      ],
    },
    {
      day: "Jueves 11 de diciembre",
      activities: [
        { time: "9:00 - 10:00 am", activity: "La planificación curricular en el marco del CNEB", speaker: "UGEL-CUSCO" },
        {
          time: "10:00 - 11:00 am",
          activity: "La Programación Anual: criterios, distribución de competencias y calendarización de unidades",
          speaker: "UGEL-CUSCO",
        },
        { time: "11:15 - 01:00 pm", activity: "Diseño de Unidades de Aprendizaje: secuencia didáctica, propósito, situación significativa y evaluación", speaker: "UGEL-CUSCO" },
        { time: "2:30 - 3:30 pm", activity: "Elaboración de Sesiones de Aprendizaje: estructura, estrategias motrices, recursos y gestión del tiempo", speaker: "UGEL-CUSCO" },
        { time: "3:30 - 4:30 pm", activity: "Proyectos integradores en Educación Física: articulación con otras áreas y enfoques transversales", speaker: "UGEL-CUSCO" },
      ],
    },
    {
      day: "Viernes 12 de diciembre",
      activities: [
        { time: "12:30 - 01:00 pm", activity: "Clases magistrales de los temas expuestos", speaker: "Ponentes" },
      ],
    },
    {
      day: "Sábado 13 de diciembre",
      activities: [
        {
          time: "9:30 - 12:00 pm",
          activity: "Clausura del seminario",
          speaker: "Comité organizador / Autoridades invitadas",
        },
      ],
    },
  ];
}
