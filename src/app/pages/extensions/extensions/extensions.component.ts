import { Component, OnInit } from '@angular/core';
import { ExtensionModel } from '@rustic/http-client';
import { Observable } from 'rxjs';
import { ExtensionsApiService } from '../extensions-api.service';

@Component({
    selector: 'rms-extensions',
    templateUrl: './extensions.component.html',
    styleUrls: ['./extensions.component.scss']
})
export class ExtensionsComponent implements OnInit {

    extensions$: Observable<ExtensionModel[]>;

    constructor(private apiService: ExtensionsApiService) {
    }

    ngOnInit() {
        this.extensions$ = this.apiService.getExtensions();
    }

}
