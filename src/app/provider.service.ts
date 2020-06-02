import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { ProviderModel } from '@rustic/http-client';
import { ApiClient } from './contracts/api-client';

@Injectable({
    providedIn: 'root'
})
export class ProviderService {

    constructor(private client: ApiClient,
                private http: HttpClient) {
    }

    getProviders(): Observable<ProviderModel[]> {
        return from(this.client.getProviders());
    }

    navigate(provider: string, path: string): Observable<any> {
        return this.http.get<any>(`api/providers/${provider}/navigate`, {
            params: {
                path
            }
        });
    }
}
