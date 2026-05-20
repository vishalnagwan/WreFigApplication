import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject }            from '@angular/core';
import { catchError, timeout } from 'rxjs/operators';
import { throwError, TimeoutError } from 'rxjs';
import { Router }            from '@angular/router';
import { AuthService }       from '../services/auth.service';

const API_TIMEOUT_MS = 20_000;   // 20 seconds

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  const token  = auth.getToken();

  const cloned = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(cloned).pipe(
    timeout(API_TIMEOUT_MS),
    catchError(err => {
      if (err instanceof TimeoutError) {
        // Convert timeout to a recognisable HTTP-like error (status 0)
        return throwError(() => ({
          status: 0,
          statusText: 'Timeout',
          message:    `No response from API after ${API_TIMEOUT_MS / 1000}s. ` +
                      'Is the API running on port 5100?'
        }));
      }
      if (err.status === 401) {
        auth.logout();
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
