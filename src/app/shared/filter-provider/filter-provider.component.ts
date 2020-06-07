import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RmsState, selectProviders } from '../../store/reducers';
import { Store } from '@ngrx/store';
import {
    SingleProvider,
    ToggleProvider,
} from '../../store/actions/provider.actions';

@Component({
    selector: 'rms-filter-provider',
    templateUrl: './filter-provider.component.html',
    styleUrls: ['./filter-provider.component.scss'],
})
export class FilterProviderComponent {
    providers$: Observable<any[]> = this.store.select(selectProviders);

    selected: string[] = [];

    constructor(private store: Store<RmsState>) {}

    toggle(name: string) {
        this.store.dispatch(new ToggleProvider(name));
    }

    single(event: MouseEvent, name: string) {
        event.preventDefault();
        this.store.dispatch(new SingleProvider(name));
    }
}
