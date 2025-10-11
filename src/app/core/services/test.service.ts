import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Character } from '../models';
import { map, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class TestService {
    private apiUrl = 'http://localhost:8000/api/test';
    private http = inject(HttpClient);


    // promise =>  promete algo que va suceder aunque termine bien o mal
    // observable => (canal de comunicacion) observan el contenido que pasa por el canal

    // getCharacters(): Observable<Character[]> {
    //     return this.http.get<Character[]>(this.apiUrl);
    // }

    // Traer solo los atributos que necesito

    // getUsers(): Observable<UserProfile[]> {
    //     return this.http.get<any[]>(this.apiUrl).pipe(
    //         map(usersList => usersList.map(user => ({
    //             name: user.name,
    //             job: user.job,
    //             phone: user.phone
    //         }))))
    // }

    //traer todos lo atributos pero con modificaciones

    getCharacters(): Observable<Character[]> {
        return this.http.get<Character[]>(this.apiUrl).pipe(
            map((characters) => {
                return characters.map((c) => ({
                    ...c,
                    name: c.name.toUpperCase(),
                    surname: c.surname.toLocaleLowerCase()
                }));
            })
        );
    }

    // put -> para hacer modificaciones, tambien es posible con post
    upadteCharacter(character: Character): Observable<Character> {
        return this.http.put<Character>(`${this.apiUrl}`, character);
    }

    deleteCharacter(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}