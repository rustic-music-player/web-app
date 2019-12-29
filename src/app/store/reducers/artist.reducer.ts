import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Artist } from '../../contracts/artist.model';
import { ArtistActionsUnion, ArtistActionTypes } from '../actions/artist.actions';

export interface State extends EntityState<Artist> {
    selectedArtistCursor: string | null;
}

const adapter = createEntityAdapter<Artist>({
    selectId: artist => artist.cursor
});

export const initialState: State = adapter.getInitialState({
    selectedArtistCursor: null
});

export function reducer(state: State = initialState, action: ArtistActionsUnion): State {
    switch (action.type) {
        case ArtistActionTypes.FetchSuccess:
            return adapter.addAll(action.payload, state);
        case ArtistActionTypes.Open:
            return {
                ...state,
                selectedArtistCursor: action.payload
            };
        case ArtistActionTypes.Close:
            return {
                ...state,
                selectedArtistCursor: null
            };
        default:
            return state;
    }
}

export const getSelectedArtistCursor = (state: State) => state.selectedArtistCursor;

export const {
    selectIds: selectArtistIds,
    selectEntities: selectArtistEntities,
    selectAll: selectAllArtists,
    selectTotal: selectArtistTotal,
} = adapter.getSelectors();