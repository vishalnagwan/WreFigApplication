import { inject }                          from '@angular/core';
import { CanActivateFn, Router }           from '@angular/router';
import { filter, switchMap, take, of, tap } from 'rxjs';
import { InteractionStatus }               from '@azure/msal-browser';
import { MsalBroadcastService }            from '@azure/msal-angular';
import { AuthService }                     from '../services/auth.service';
import { environment }                     from '../../environments/environment';

const LOG = '[AUTH GUARD]';

export const authGuard: CanActivateFn = (route, state) => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  console.log(`${LOG} ── fired for URL: ${state.url}`);

  if (!environment.useMsalAuth) {
    const loggedIn = auth.isLoggedIn();
    console.log(`${LOG} ── form-auth mode | isLoggedIn = ${loggedIn}`);
    if (loggedIn) return true;
    router.navigate(['/login']);
    return false;
  }

  const msalBroadcast = inject(MsalBroadcastService);

  return msalBroadcast.inProgress$.pipe(
    tap(status => console.log(`${LOG} ── inProgress$ =`, status)),
    filter(status => status === InteractionStatus.None),
    take(1),
    switchMap(() => {
      const loggedIn = auth.isLoggedIn();
      const token    = localStorage.getItem('fig_token');
      console.log(`${LOG} ── inProgress = None | isLoggedIn = ${loggedIn} | fig_token present = ${!!token}`);
      if (loggedIn) return of(true);
      console.log(`${LOG} ── NOT logged in — navigating to /login`);
      router.navigate(['/login']);
      return of(false);
    })
  );
};
