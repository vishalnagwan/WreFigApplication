import { IPublicClientApplication, PublicClientApplication,
         BrowserCacheLocation, LogLevel,
         InteractionType }                from '@azure/msal-browser';
import { MsalGuardConfiguration }        from '@azure/msal-angular';
import { environment }                   from '../environments/environment';

export function msalInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId:              environment.azureClientId,
      authority:             `https://login.microsoftonline.com/${environment.azureTenantId}`,
      redirectUri:           window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      // Must be false — we handle post-auth navigation ourselves in
      // APP_INITIALIZER.  When true, MSAL navigates back to the URL that
      // triggered loginRedirect() which was /login, sending the user back
      // to the login page even after a successful authentication.
      navigateToLoginRequestUrl: false,
    },
    cache: {
      cacheLocation:          BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: false,
    },
    system: {
      loggerOptions: {
        logLevel:          environment.production ? LogLevel.Error : LogLevel.Verbose,
        piiLoggingEnabled: false,
      }
    }
  });
}

export function msalGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,   // Fixed: enum, not string
    authRequest: {
      // Only standard OIDC scopes at login time.
      // API scope is acquired separately after login via acquireTokenSilent.
      scopes: ['openid', 'profile', 'email'],
    },
    loginFailedRoute: '/login',
  };
}
