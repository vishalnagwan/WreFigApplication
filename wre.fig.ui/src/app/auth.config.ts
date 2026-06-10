import { ApplicationConfig, provideZoneChangeDetection,
         APP_INITIALIZER }                                from '@angular/core';
import { firstValueFrom, of }                             from 'rxjs';
import { catchError }                                     from 'rxjs/operators';
import { provideRouter }                                  from '@angular/router';
import { provideHttpClient, withInterceptors }            from '@angular/common/http';
import { provideAnimations }                              from '@angular/platform-browser/animations';
import { providePrimeNG }                                from 'primeng/config';
import Aura                                              from '@primeng/themes/aura';
import { MessageService }                                from 'primeng/api';

import { Router }          from '@angular/router';
import { routes }          from './app.routes';
import { jwtInterceptor }  from './interceptors/jwt.interceptor';
import { AuthService }     from './services/auth.service';

import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MsalBroadcastService,
  MsalGuard,
  MsalService
} from '@azure/msal-angular';

import { environment }           from '../environments/environment';
import { msalInstanceFactory,
         msalGuardConfigFactory } from './msal.config';

const LOG = '[MSAL INIT]';

function msalInitializerFactory(
  msalService:  MsalService,
  authService:  AuthService,
  router:       Router,
): () => Promise<void> {
  return async () => {
    console.log(`${LOG} ── Step 1: initialize() starting`);
    await firstValueFrom(msalService.initialize());
    console.log(`${LOG} ── Step 1: initialize() complete`);

    console.log(`${LOG} ── Step 2: handleRedirectObservable() starting`);
    const result = await firstValueFrom(
      msalService.handleRedirectObservable().pipe(
        catchError(err => {
          console.error(`${LOG} ── Step 2 ERROR:`, err?.errorCode, err?.message, err);
          return of(null);
        })
      )
    );
    console.log(`${LOG} ── Step 2: handleRedirectObservable() result =`, result);

    if (result !== null) {
      console.log(`${LOG} ── Redirect was processed. account =`, result.account?.username);
      console.log(`${LOG} ── idTokenClaims =`, result.idTokenClaims);

      // Use the ID token directly — it already contains email, name, oid, and
      // roles (confirmed in logs: idTokenClaims.roles = ["wre.fig.Admin"]).
      // The separate acquireTokenSilent(user.access) step is not needed because
      // Azure does not include App Role claims in delegated access tokens by
      // default; they appear reliably only in the ID token.
      const idToken = result.idToken;
      if (!idToken) {
        console.warn(`${LOG} ── No idToken in redirect result — cannot exchange`);
      } else {
        console.log(`${LOG} ── Step 3: POST /api/auth/microsoft with ID token`);
        const exchangeResult = await firstValueFrom(
          authService.loginWithMicrosoft(idToken).pipe(
            catchError(err => {
              console.error(`${LOG} ── Step 3 ERROR: FIG token exchange failed`,
                            '| HTTP status =', err?.status,
                            '| body =', err?.error,
                            err);
              return of(null);
            })
          )
        );

        if (exchangeResult) {
          console.log(`${LOG} ── Step 3: FIG JWT issued ✅`,
                      '| user =', (exchangeResult as any).email,
                      '| role =', (exchangeResult as any).role);
          // Navigate to root — without this, MSAL would navigate back to /login
          // (the URL that originally triggered loginRedirect)
          await router.navigate(['/']);
        } else {
          console.warn(`${LOG} ── Step 3: exchange returned null — fig_token NOT written`);
        }
      }
    } else {
      console.log(`${LOG} ── No redirect to process (normal page load)`);
    }

    console.log(`${LOG} ── Done. fig_token in localStorage =`,
                !!localStorage.getItem('fig_token'),
                '| URL =', window.location.href);
  };
}

const msalProviders = environment.useMsalAuth ? [
  { provide: MSAL_INSTANCE,     useFactory: msalInstanceFactory },
  { provide: MSAL_GUARD_CONFIG, useFactory: msalGuardConfigFactory },
  MsalService,
  MsalGuard,
  MsalBroadcastService,
  {
    provide:    APP_INITIALIZER,
    useFactory: msalInitializerFactory,
    deps:       [MsalService, AuthService, Router],
    multi:      true,
  }
] : [];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideAnimations(),
    providePrimeNG({ theme: { preset: Aura } }),
    MessageService,
    ...msalProviders,
  ]
};
