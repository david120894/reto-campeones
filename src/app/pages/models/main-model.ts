export interface Evento {
  id: string;
  titulo: string;
  fecha: string;
  ubicacion: string;
  capacidad: string;
  categoria: string;
  imagen: string;
  descripcion: string;
}

export interface Stats {
  eventosRealizados: number;
  asistentesTotales: number;
  satisfaccion: number;
  anosExperiencia: number;
}
