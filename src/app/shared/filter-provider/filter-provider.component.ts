import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProviderModel } from '../../contracts/provider.model';

@Component({
    selector: 'rms-filter-provider',
    templateUrl: './filter-provider.component.html',
    styleUrls: ['./filter-provider.component.scss']
})
export class FilterProviderComponent {
    providers$: Observable<string[]> = this.httpClient.get<ProviderModel[]>('/api/providers')
        .pipe(
            map(providers => providers.map(provider => provider.provider)),
            tap(providers => (this.selected = providers))
        );

    selected: string[] = [];

    constructor(private httpClient: HttpClient) {
    }

    toggle(name: string) {
        const index = this.selected
            .findIndex(provider => provider === name);
        if (index !== -1) {
            this.selected = this.selected.filter(provider => provider !== name);
        }else {
            this.selected = [...this.selected, name];
        }
    }

    isSelected(name: string) {
        return this.selected.includes(name);
    }
}
