import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ModelTokenModel } from '../models/modelToken.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'authToken';
  private refreshTokenKey = 'refreshToken';
  private userKey = 'authUser';
  private userSubject = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
  ) {
    const storedUser = localStorage.getItem(this.userKey);
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  saveRefreshToken(token: string): void {
    localStorage.setItem(this.refreshTokenKey, token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(this.refreshTokenKey);
  }

  login(credentials: any): Observable<ModelTokenModel> {
    const body = { username: credentials.email, password: credentials.password };
    return this.http.post(`${this.apiUrl}/authorize`, body).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 422) {
          return throwError(() => error.error.error);
        }
        return throwError(() => 'login error');
      }),
      tap((response: any) => {
        console.log(response);
        if (response.access_token) {
          this.saveToken(response.access_token);
          if (response.refresh_token) {
            this.saveRefreshToken(response.refresh_token);
          }
        }
      }),
    );
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    console.log('refreshToken', refreshToken);
    if (!refreshToken) {
      return throwError(() => 'No refresh token available');
    }

    return this.http.post<any>(`${this.apiUrl}/authorize/refresh`, { refresh_token: refreshToken }).pipe(
      tap((response) => {
        if (response.access_token) {
          this.saveToken(response.access_token);
        }
      }),
      catchError((err) => {
        console.error('Error refreshing token', err);
        return throwError(() => 'Error refreshing token');
      }),
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post<{ message: string; user?: any }>(`${this.apiUrl}/authorize`, userData).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 422) {
          return throwError(() => err.error.errors);
        }
        return throwError(() => 'Error de registro');
      }),
    );
  }

  logout(): Observable<any> {

    const currentRefreshToken = this.getRefreshToken();
    console.log('currentRefreshToken', currentRefreshToken);

    return this.http.post(`${this.apiUrl}/authorize/logout`, { refresh_token: currentRefreshToken }).pipe(
      tap(() => {
        this.removeToken();
        this.removeUser();
        this.removeRefreshToken();
      }),
      catchError((err) => {
        console.error('Logout error:', err);
        this.removeToken();
        this.removeUser();
        this.removeRefreshToken();
        return of(null);
      }),
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
    return this.http.get<any>(`${this.apiUrl}/authorize/userinfo`).pipe(
      tap((user) => {
        if (user) {
          this.saveUser(user);
        }
      }),
      catchError(() => of(null)),
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
