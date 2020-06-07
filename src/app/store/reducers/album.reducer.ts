import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { AlbumModel } from '@rustic/http-client';
import { AlbumActionsUnion, AlbumActionTypes } from '../actions/album.actions';

export interface State extends EntityState<AlbumModel> {
    selectedAlbumCursor: string | null;
}

const adapter = createEntityAdapter<AlbumModel>({
    selectId: (album) => album.cursor,
});

export const initialState: State = adapter.getInitialState({
    selectedAlbumCursor: null,
});

export function reducer(
    state: State = initialState,
    action: AlbumActionsUnion
): State {
    switch (action.type) {
        case AlbumActionTypes.FetchSuccess:
            return adapter.setAll(action.payload, state);
        case AlbumActionTypes.Open:
            return {
                ...state,
                selectedAlbumCursor: action.payload,
            };
        case AlbumActionTypes.Close:
            return {
                ...state,
                selectedAlbumCursor: null,
            };
        case AlbumActionTypes.FetchSingleSuccess:
            return adapter.upsertOne(action.payload.album, state);
        default:
            return state;
    }
}

export const getSelectedAlbumCursor = (state: State) =>
    state.selectedAlbumCursor;

export const {
    selectIds: selectAlbumIds,
    selectEntities: selectAlbumEntities,
    selectAll: selectAllAlbums,
    selectTotal: selectAlbumTotal,
} = adapter.getSelectors();
