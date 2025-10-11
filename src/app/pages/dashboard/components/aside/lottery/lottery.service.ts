import { Injectable } from '@angular/core';
import { Participant } from './lottery.model'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LotteryService {
  constructor(private http: HttpClient) { }
  private participants: Participant[] = [
    { id: 1, name: "Carlos Rodríguez", number: "#15", category: "Élite Masculino", prize: "Bicicleta de Montaña Pro" },
    { id: 2, name: "Ana Martínez", number: "#07", category: "Femenino", prize: "Casco Profesional" },
    { id: 3, name: "Luis García", number: "#22", category: "Master A", prize: "Ruedas de Carbono" },
    { id: 4, name: "María López", number: "#11", category: "Femenino", prize: "Kit de Mantenimiento" },
    { id: 5, name: "Javier Sánchez", number: "#33", category: "Élite Masculino", prize: "GPS Ciclocomputador" },
    { id: 6, name: "Elena Díaz", number: "#18", category: "Master B", prize: "Vestuario Técnico" },
    { id: 7, name: "Pedro Fernández", number: "#25", category: "Junior", prize: "Zapatillas de Ciclismo" },
    { id: 8, name: "Sofía Ruiz", number: "#09", category: "Femenino", prize: "Gafas Deportivas" },
    { id: 9, name: "Miguel Torres", number: "#30", category: "Élite Masculino", prize: "Sillín de Competición" },
    { id: 10, name: "Laura Gómez", number: "#12", category: "Master A", prize: "Pedales Automáticos" },
    { id: 11, name: "David Romero", number: "#05", category: "Junior", prize: "Bidón y Portabidón" },
    { id: 12, name: "Carmen Vega", number: "#28", category: "Femenino", prize: "Guantes de Ciclismo" },
    { id: 13, name: "Alejandro Cruz", number: "#19", category: "Élite Masculino", prize: "Cadena y Piñones" },
    { id: 14, name: "Isabel Morales", number: "#03", category: "Master B", prize: "Bomba de Aire" },
    { id: 15, name: "Francisco Ortega", number: "#21", category: "Junior", prize: "Luz LED Trasera" },
    { id: 16, name: "Patricia Reyes", number: "#14", category: "Femenino", prize: "Maillot Técnico" },
    { id: 17, name: "Roberto Navarro", number: "#08", category: "Master A", prize: "Culotte de Competición" },
    { id: 18, name: "Teresa Silva", number: "#26", category: "Femenino", prize: "Candado para Bicicleta" },
    { id: 19, name: "Sergio Mendoza", number: "#17", category: "Élite Masculino", prize: "Cámara de Repuesto" },
    { id: 20, name: "Natalia Castro", number: "#04", category: "Junior", prize: "Toalla Deportiva" }
  ];

  getParticipants(): Participant[] {
    return this.participants;
  }

  getParticipantById(id: number): Participant | undefined {
    return this.participants.find(p => p.id === id);
  }
}
