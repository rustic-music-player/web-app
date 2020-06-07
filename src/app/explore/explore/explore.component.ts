import { Component } from '@angular/core';
import { ProviderModel } from '@rustic/http-client';
import { defer, Observable } from 'rxjs';
import { RmsState, selectProviders } from '../../store/reducers';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
    selector: 'rms-explore',
    templateUrl: './explore.component.html',
    styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent {
    constructor(private store: Store<RmsState>) {}

    private selectProviders = () =>
        this.store.select(selectProviders).pipe(
            map((providers) =>
                providers.filter((provider) => {
                    return (
                        provider.explore.folders.length > 0 ||
                        provider.explore.items.length > 0
                    );
                })
            )
        );

    providers$: Observable<ProviderModel[]> = defer(this.selectProviders);
}
