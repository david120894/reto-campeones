import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Reservation } from '../models';
import { ResponseRegisterModels } from '../models/response.register.models';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = environment.apiUrl
  private http = inject(HttpClient);

  getConsulting():Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.apiUrl}/queries`).pipe(
      map(reservations => reservations.filter(r => r.type === 'consultation')
      )
    );
  }

  saveRegister(body:any): Observable<ResponseRegisterModels> {
    return this.http.post<ResponseRegisterModels>(`http://172.16.4.74:30011/api/participants/create`, body);
  }

  searchByDni(dni: string): Observable<ResponseRegisterModels> {
    return this.http.get<ResponseRegisterModels>(`http://172.16.4.74:30011/api/participants/search?dni=${dni}`)
  }
  getReservation():Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.apiUrl}/reserves`).pipe(
      map(reservations => reservations.filter(r => r.type === 'reservation')
      )
    );
  }

  updateReserveState(id: number, req_state: string): Observable<any> {
    const body = { req_state };
    return this.http.put(`${this.apiUrl}/${id}/state`, body);
  }

  sendReservation(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
