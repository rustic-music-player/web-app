import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { TrackModel } from '@rustic/http-client';
import { TrackActionsUnion, TrackActionTypes } from '../actions/track.actions';

export interface State extends EntityState<TrackModel> {}

const adapter = createEntityAdapter<TrackModel>({
    selectId: (track) => track.cursor,
});

export const initialState: State = adapter.getInitialState();

export function reducer(
    state: State = initialState,
    action: TrackActionsUnion
): State {
    switch (action.type) {
        case TrackActionTypes.FetchSuccess:
            return adapter.addAll(action.payload, state);
        default:
            return state;
    }
}

export const {
    selectIds: selectTrackIds,
    selectEntities: selectTrackEntities,
    selectAll: selectAllTracks,
    selectTotal: selectTrackTotal,
} = adapter.getSelectors();
