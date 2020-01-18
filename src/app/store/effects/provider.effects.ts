import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FetchProviders, FetchProvidersSuccess, ProviderActionTypes } from '../actions/provider.actions';
import { ProviderService } from '../../provider.service';

@Injectable()
export class ProviderEffects {

    @Effect() fetch$ = this.actions$.pipe(
        ofType(ProviderActionTypes.Fetch),
        switchMap(() => this.providerApi.getProviders().pipe(
            map(providers => new FetchProvidersSuccess(providers))
        ))
    );

    @Effect() initialFetch$ = of(new FetchProviders());

    constructor(private actions$: Actions,
                private providerApi: ProviderService) {
    }
}