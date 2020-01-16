import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProviderModel } from './contracts/provider.model';

@Injectable({
    providedIn: 'root'
})
export class ProviderService {

    constructor(private http: HttpClient) {
    }

    getProviders(): Observable<ProviderModel[]> {
        return this.http.get<ProviderModel[]>('api/providers');
    }
}
