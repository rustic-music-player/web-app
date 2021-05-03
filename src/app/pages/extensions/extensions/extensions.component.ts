import { Component, OnInit } from '@angular/core';
import { ExtensionModel } from '@rustic/http-client';
import { Observable, Subject } from 'rxjs';
import { ExtensionsApiService } from '../extensions-api.service';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
    selector: 'rms-extensions',
    templateUrl: './extensions.component.html',
    styleUrls: ['./extensions.component.scss'],
})
export class ExtensionsComponent implements OnInit {
    private refresh$ = new Subject();
    extensions$: Observable<ExtensionModel[]>;

    constructor(private apiService: ExtensionsApiService) {
    }

    ngOnInit() {
        this.extensions$ = this.refresh$.pipe(startWith<unknown, unknown>(null), switchMap(() => this.apiService.getExtensions()));
    }

    disable(extension: ExtensionModel) {
        this.apiService.disable(extension.id).subscribe(() => this.refresh$.next());
    }

    enable(extension: ExtensionModel) {
        this.apiService.enable(extension.id).subscribe(() => this.refresh$.next());
    }

    trackMethod(index: number, extension: ExtensionModel) {
        return extension.id;
    }
}
