import { Injectable, OnDestroy } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export interface InstructionUpdateEvent {
  branchId:      number;
  updatedByName: string;
}

@Injectable({ providedIn: 'root' })
export class SignalrService implements OnDestroy {

  private hub?: HubConnection;

  readonly instructionUpdated$ = new Subject<InstructionUpdateEvent>();
  readonly alertCreated$       = new Subject<void>();

  constructor(private auth: AuthService) {}

  async startAsync(): Promise<void> {
    const token = this.auth.getToken();
    if (!token) return;

    this.hub = new HubConnectionBuilder()
      .withUrl(environment.hubUrl, { accessTokenFactory: () => token })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Warning)
      .build();

    this.hub.on('instructionsUpdated', (branchId: number, updatedByName: string) =>
      this.instructionUpdated$.next({ branchId, updatedByName }));

    this.hub.on('alertCreated', () =>
      this.alertCreated$.next());

    await this.hub.start();
  }

  async joinBranch(branchId: number): Promise<void> {
    await this.hub?.invoke('JoinBranch', branchId);
  }

  async leaveBranch(branchId: number): Promise<void> {
    await this.hub?.invoke('LeaveBranch', branchId);
  }

  async stopAsync(): Promise<void> {
    await this.hub?.stop();
  }

  ngOnDestroy(): void {
    this.hub?.stop();
  }
}
