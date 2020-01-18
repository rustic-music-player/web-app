import { Component } from '@angular/core';
import { ProviderModel } from '../../contracts/provider.model';
import { defer, Observable } from 'rxjs';
import { RmsState, selectProviders } from '../../store/reducers';
import { Store } from '@ngrx/store';

@Component({
    selector: 'rms-explore',
    templateUrl: './explore.component.html',
    styleUrls: ['./explore.component.scss']
})
export class ExploreComponent {
    providers$: Observable<ProviderModel[]> = defer(() => this.store.select(selectProviders));

    constructor(private store: Store<RmsState>) {
    }
}
