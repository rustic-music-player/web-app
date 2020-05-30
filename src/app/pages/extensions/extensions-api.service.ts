import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { ExtensionModel } from '@rustic/http-client';
import { ApiClient } from '../../contracts/api-client';

@Injectable({
    providedIn: 'root'
})
export class ExtensionsApiService {
    constructor(private client: ApiClient) {
    }

    getExtensions(): Observable<ExtensionModel[]> {
        return from(this.client.getExtensions());
    }
}
