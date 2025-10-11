import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Place } from '../models/place';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  // private apiUrl = environment.apiUrl + '/places';
  private apiUrl = ''

  constructor(private http: HttpClient) { }

  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(this.apiUrl);
  }

  getPlace(id: number): Observable<Place> {
    return this.http.get<Place>(`${this.apiUrl}/${id}`);
  }

  createPlace(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  updatePlace(id: number, data: Partial<Place> | FormData): Observable<any> {
    if (data instanceof FormData) {
      return this.http.put(`${this.apiUrl}/${id}`, data);
    }
    return this.http.put(`${this.apiUrl}/${id}`, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deletePlace(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

