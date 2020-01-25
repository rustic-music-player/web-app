import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    providers$ = this.httpClient.get<AvailableProvider[]>('api/providers/available');

    constructor(private httpClient: HttpClient) {
    }
}
