import { Action } from '@ngrx/store';
import { ProviderModel } from '../../contracts/provider.model';

export enum ProviderActionTypes {
    Fetch = 'provider/fetch',
    FetchSuccess = 'provider/fetch/success',
    FetchError = 'provider/fetch/error',
    ToggleSelection = 'provider/select/toggle'
}

export class FetchProviders implements Action {
    readonly type = ProviderActionTypes.Fetch;
}

export class FetchProvidersSuccess implements Action {
    readonly type = ProviderActionTypes.FetchSuccess;

    public payload: {
        providers: ProviderModel[];
    };

    constructor(providers: ProviderModel[]) {
        this.payload = {
            providers
        };
    }
}

export class ToggleProvider implements Action {
    readonly type = ProviderActionTypes.ToggleSelection;

    public payload: {
        provider: string;
    };

    constructor(provider: string) {
        this.payload = {
            provider
        };
    }

}

export type ProviderActionsUnion = FetchProviders | FetchProvidersSuccess | ToggleProvider;