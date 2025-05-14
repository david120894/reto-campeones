import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

export function authInterceptorFn(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  const loadingService = inject(LoadingService);

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const refresh = authService.getRefreshToken();
        if (!refresh) {
          console.log('No refresh token available');
          // loadingService.show(); // muestra loading
          // setTimeout(() => {
            authService.removeToken();
            authService.removeRefreshToken();
            // window.location.reload(); // recarga la página completamente
          // }, 2000); // breve delay para mostrar spinner
          return throwError(() => error);
        }

        return authService.refreshToken().pipe(
          switchMap((res: any) => {
            console.log('Refreshing token:', res);
            authService.saveToken(res.access_token);
            authService.saveRefreshToken(res.refresh_token);
            console.log('Token refreshed:', res);
            const newAuthReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.access_token}`,
              },
            });

            return next(newAuthReq); // Reintenta la solicitud original con nuevo token
          }),
          catchError(err => {
            loadingService.show();
            setTimeout(() => {
              authService.removeToken();
              authService.removeRefreshToken();
              window.location.reload();
            }, 500);
            return throwError(() => err);
          })
        );
      } else if (error.status === 403) {
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
}
