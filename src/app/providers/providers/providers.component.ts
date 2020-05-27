import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProviderPasswordLogin } from './provider-password-authentication/provider-password-authentication.component';
import { defer, merge, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface AvailableProvider {
    title: string;
    provider: string;
    configured: boolean;
    authState: {
        state: string;
        url?: string;
    }
}

@Component({
    selector: 'rms-providers',
    templateUrl: './providers.component.html',
    styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent {
    private refresh$ = new Subject();

    providers$ = defer(() => {
        const load$ = this.httpClient.get<AvailableProvider[]>('api/providers/available');
        const refresh$ = this.refresh$.pipe(switchMap(() => load$));

        return merge(load$, refresh$);
    });

    constructor(private httpClient: HttpClient) {
    }

    onLogin(provider: string, credentials: ProviderPasswordLogin) {
        this.httpClient.post<void>(`api/providers/${provider}/auth`, credentials).subscribe(() => this.refresh$.next());
    }
}
