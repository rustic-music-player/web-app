import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExtensionModel } from '../contracts/extension.model';

@Injectable({
    providedIn: 'root'
})
export class ExtensionsApiService {
    constructor(private httpClient: HttpClient) {
    }

    getExtensions(): Observable<ExtensionModel[]> {
        return this.httpClient.get<ExtensionModel[]>('api/extensions');
    }
}