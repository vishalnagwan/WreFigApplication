import { Component, OnInit, OnDestroy, Optional } from '@angular/core';
import { CommonModule }                            from '@angular/common';
import { RouterOutlet }                            from '@angular/router';
import { ToastModule }                             from 'primeng/toast';
import { Subject }                                 from 'rxjs';
import { filter, takeUntil }                       from 'rxjs/operators';

import { MsalBroadcastService }                    from '@azure/msal-angular';
import { InteractionStatus }                       from '@azure/msal-browser';

import { environment }                             from '../environments/environment';

@Component({
  selector:    'app-root',
  standalone:  true,
  imports:     [CommonModule, RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject<void>();

  // True while MSAL is processing a redirect — can drive a loading spinner
  msalInProgress = false;

  constructor(
    @Optional() private msalBroadcast?: MsalBroadcastService,
  ) {}

  ngOnInit(): void {
    if (!environment.useMsalAuth || !this.msalBroadcast) return;

    // Track MSAL interaction state for loading-indicator purposes only.
    // All redirect handling and token exchange now happens in APP_INITIALIZER
    // (auth.config.ts) so there is no race condition with the auth guard.
    this.msalBroadcast.inProgress$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(status => {
      this.msalInProgress = (status !== InteractionStatus.None);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
