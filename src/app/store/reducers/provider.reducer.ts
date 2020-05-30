import { ProviderModel } from '@rustic/http-client';
import { ProviderActionsUnion, ProviderActionTypes } from '../actions/provider.actions';

export interface State {
    providers: ProviderModel[];
    selected: string[];
}

export const initial: State = {
    providers: [],
    selected: []
};

export function reducer(state: State = initial, action: ProviderActionsUnion): State {
    switch (action.type) {
        case ProviderActionTypes.FetchSuccess:
            return {
                ...state,
                providers: action.payload.providers,
                selected: action.payload.providers.map(provider => provider.provider)
            };
        case ProviderActionTypes.ToggleSelection:
            const index = state.selected
                .findIndex(provider => provider === action.payload.provider);
            let selected;
            if (index !== -1) {
                selected = state.selected.filter(provider => provider !== action.payload.provider);
            } else {
                selected = [...state.selected, action.payload.provider];
            }
            if (selected.length === 0) {
                return {
                    ...state,
                    selected: state.providers.map(p => p.provider)
                };
            }
            return {
                ...state,
                selected
            };
        case ProviderActionTypes.SingleSelection:
            return {
                ...state,
                selected: [action.payload.provider]
            };
        default:
            return state;
    }
}

export const selectProviders = (state: State) => state.providers.map(provider => ({
    ...provider,
    selected: state.selected.includes(provider.provider)
}));
