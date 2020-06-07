import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ArtistModel } from '@rustic/http-client';
import {
    ArtistActionsUnion,
    ArtistActionTypes,
} from '../actions/artist.actions';

export interface State extends EntityState<ArtistModel> {
    selectedArtistCursor: string | null;
}

const adapter = createEntityAdapter<ArtistModel>({
    selectId: (artist) => artist.cursor,
});

export const initialState: State = adapter.getInitialState({
    selectedArtistCursor: null,
});

export function reducer(
    state: State = initialState,
    action: ArtistActionsUnion
): State {
    switch (action.type) {
        case ArtistActionTypes.FetchSuccess:
            return adapter.addAll(action.payload, state);
        case ArtistActionTypes.Open:
            return {
                ...state,
                selectedArtistCursor: action.payload,
            };
        case ArtistActionTypes.Close:
            return {
                ...state,
                selectedArtistCursor: null,
            };
        case ArtistActionTypes.FetchSingleSuccess:
            return adapter.upsertOne(action.payload.artist, state);
        default:
            return state;
    }
}

export const getSelectedArtistCursor = (state: State) =>
    state.selectedArtistCursor;

export const {
    selectIds: selectArtistIds,
    selectEntities: selectArtistEntities,
    selectAll: selectAllArtists,
    selectTotal: selectArtistTotal,
} = adapter.getSelectors();
