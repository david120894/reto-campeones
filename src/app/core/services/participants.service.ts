import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ParticipantsModel } from '../models/participants.model';
import { ParticipantSeminar } from '../models/model.seminar'
import { SeminarAttendance } from '../models/seminar-attendance'

@Injectable({
  providedIn: 'root',
})
export class ParticipantsService {
  constructor(private http: HttpClient) {
  }

  getAllParticipants(): Observable<ParticipantsModel[]> {
    return this.http.get<ParticipantsModel[]>(`${environment.apiUrl}/participants`);
  }

  getAllParticipantsSeminar():Observable<ParticipantSeminar[]> {
    return this.http.get<ParticipantSeminar[]>(`${environment.apiUrl}/seminar/participants`);
  }

  getParticipantsAttendanceSeminar(date : string) :Observable<SeminarAttendance[]> {
    return this.http.get<SeminarAttendance[]>(`${environment.apiUrl}/seminar/attendance/date/${date}`);
  }

  getParticipantsById(dni: string): Observable<string> {
    return this.http.get(`${environment.apiUrl}/participants/authorization/${dni}`, {
      responseType: 'text'
    });
  }
  getWinner():Observable<ParticipantsModel> {
    return this.http.get<ParticipantsModel>(`${environment.apiUrl}/participants/draw`);
  }

}
