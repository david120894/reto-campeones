import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'authToken';
  private userKey = 'authUser';
  private userSubject = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient
  ) {
    const storedUser = localStorage.getItem(this.userKey);
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  register(userData: any): Observable<any> {
    return this.http.post<{ message: string; user?: any }>(`${this.apiUrl}/register`, userData).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 422) {
          // console.log("error with status 422");
          return throwError(() => err.error.errors);
        }
        return throwError(() => 'Error de registro');
      })
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 422) {
          // console.log("login ingreso a error 422");
            return throwError(() => error.error.error);
        }
        return throwError(() => 'login error');
    }),
      tap((response: any) => {
        if (response.token) {
          // console.log("login ingreso a token");
          this.saveToken(response.token);
          if (response.user) {
            this.saveUser(response.user);
          }
        }
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        this.removeToken();
        this.removeUser();
      }),
      catchError((err) => {
        console.error('Logout error:', err);
        this.removeToken();
        this.removeUser();
        return of(null);
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  saveUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.userSubject.next(user);
  }

  removeUser(): void {
    localStorage.removeItem(this.userKey);
    this.userSubject.next(null);
  }

  getUserProfile(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return of(null);
    }
    return this.http.get<any>(`${this.apiUrl}/me`).pipe(
      tap((user) => {
        if (user) {
          this.saveUser(user); 
        }
      }),
      catchError(() => of(null))
    );
  }

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.userSubject.value;
    return user && user.role === 'admin';
  }

  isUser(): boolean {
    const user = this.userSubject.value;
    return user && user.role === 'user';
  }
}