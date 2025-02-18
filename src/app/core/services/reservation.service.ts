import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8000/api/reservations';

  constructor(private http: HttpClient) { }

  sendReservation(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}