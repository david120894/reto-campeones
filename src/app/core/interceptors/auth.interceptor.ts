import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, switchMap } from 'rxjs/operators'
import { inject } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'
import { LoadingService } from '../services/loading.service'

export function authInterceptorFn(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService)
  const router = inject(Router)
  const token = authService.getToken()
  const loadingService = inject(LoadingService)

  let authReq = req
  if (req.url.includes('/authorize/update')) {
    return next(req);
  }
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (req.url.includes('/authorize/update')) {
        return throwError(() => error)
      }
      if (error.status === 401) {
        const refresh = authService.getRefreshToken()
        if (!refresh) {
          authService.removeToken()
          authService.removeRefreshToken()
          return throwError(() => error)
        }

        return authService.refreshToken().pipe(
          switchMap((res: any) => {
            authService.saveToken(res.access_token)
            authService.saveRefreshToken(res.refresh_token)
            const newAuthReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.access_token}`,
              },
            })
            return next(newAuthReq)
          }),
          catchError(err => {
            setTimeout(() => {
              authService.removeToken()
              authService.removeRefreshToken()
              // authService.removeUser()
              router.navigate(['/login'])
              window.location.reload()
            }, 500)
            return throwError(() => err)
          }),
        )
      } else if (error.status === 403) {
        router.navigate(['/login'])
      }

      return throwError(() => error)
    }),
  )
}
