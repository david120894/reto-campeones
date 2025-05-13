import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ParticipantsModel } from '../models/participants.model';

@Injectable({
  providedIn: 'root',
})
export class ParticipantsService {
  constructor(private http: HttpClient) {
  }

  getAllParticipants(): Observable<ParticipantsModel[]> {
    return this.http.get<ParticipantsModel[]>(`${environment.apiUrl}/participants`);
  }

  getParticipantsById(dni: string): Observable<string> {
    return this.http.get(`${environment.apiUrl}/participants/authorization/${dni}`, {
      responseType: 'text'
    });
  }

}
