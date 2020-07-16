import { Component, OnInit } from '@angular/core';
import { ExtensionModel } from '@rustic/http-client';
import { Observable, Subject } from 'rxjs';
import { ExtensionsApiService } from '../extensions-api.service';
import { startWith, switchMap } from 'rxjs/operators';
import { MatSelectionListChange } from '@angular/material/list';

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

    onChange(event: MatSelectionListChange) {
        let extension = event.option.value;
        let observable;
        if (extension.enabled) {
            observable = this.apiService.disable(extension.id);
        } else {
            observable = this.apiService.enable(extension.id);
        }
        observable.subscribe(() => this.refresh$.next());
    }
}
