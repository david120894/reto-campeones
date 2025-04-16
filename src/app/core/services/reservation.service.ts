import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Reservation } from '../models';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = environment.apiUrl + '/reservations';
  private http = inject(HttpClient);
  
  getConsulting():Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.apiUrl}/queries`).pipe(
      map(reservations => reservations.filter(r => r.type === 'consultation')
      )
    );
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