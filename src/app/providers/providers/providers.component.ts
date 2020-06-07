import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProviderPasswordLogin } from './provider-password-authentication/provider-password-authentication.component';
import { defer, merge, Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApiClient } from '../../contracts/api-client';
import { AvailableProviderModel } from '@rustic/http-client';

@Component({
    selector: 'rms-providers',
    templateUrl: './providers.component.html',
    styleUrls: ['./providers.component.scss'],
})
export class ProvidersComponent {
    private refresh$ = new Subject();

    providers$: Observable<AvailableProviderModel[]> = defer(() => {
        const load$ = this.client.getAvailableProviders();
        const refresh$ = this.refresh$.pipe(switchMap(() => load$));

        return merge(load$, refresh$);
    });

    constructor(private client: ApiClient, private httpClient: HttpClient) {}

    onLogin(provider: string, credentials: ProviderPasswordLogin) {
        this.httpClient
            .post<void>(`api/providers/${provider}/auth`, credentials)
            .subscribe(() => this.refresh$.next());
    }
}
