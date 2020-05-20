import { Track } from '../../contracts/track.model';
import { PlayerActionsUnion, PlayerActionTypes } from '../actions/player.actions';

export interface State {
    playing: boolean;
    currentTrack?: Track;
    volume: number;
}

export const initial: State = {
    playing: false,
    volume: 1
};

export function reducer(state: State = initial, action: PlayerActionsUnion): State {
    switch (action.type) {
        case PlayerActionTypes.CurrentTrackUpdated:
            return {
                ...state,
                currentTrack: action.payload
            };
        case PlayerActionTypes.StateUpdated:
            return {
                ...state,
                playing: action.payload
            };
        case PlayerActionTypes.VolumeUpdated:
        case PlayerActionTypes.ChangeVolume:
            return {
                ...state,
                volume: action.payload
            };
        default:
            return state;
    }
}

export const selectPlayingState = (state: State) => state.playing;
export const selectCurrentTrack = (state: State) => state.currentTrack;
export const selectVolume = (state: State) => state.volume;
