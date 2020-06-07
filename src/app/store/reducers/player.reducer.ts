import { PlayerModel } from '@rustic/http-client';
import { PlayerActionsUnion, PlayerActionTypes } from '../actions/player.actions';

export interface State {
    players: PlayerModel[];
    currentPlayer?: string;
}

export const initial: State = {
    players: []
};

export function reducer(state: State = initial, action: PlayerActionsUnion): State {
    switch (action.type) {
        case PlayerActionTypes.FetchPlayers:
            return {
                ...state,
                currentPlayer: action.payload.players[0].cursor,
                players: action.payload.players
            };
        case PlayerActionTypes.SelectPlayer:
            return {
                ...state,
                currentPlayer: action.payload.cursor
            };
        case PlayerActionTypes.CurrentTrackUpdated:
            return {
                ...state,
                players: state.players.map(p => {
                    if (p.cursor !== action.cursor) {
                        return p;
                    }
                    return {
                        ...p,
                        current: action.payload
                    };
                })
            };
        case PlayerActionTypes.StateUpdated:
            return {
                ...state,
                players: state.players.map(p => {
                    if (p.cursor !== action.cursor) {
                        return p;
                    }
                    return {
                        ...p,
                        playing: action.payload
                    };
                })
            };
        case PlayerActionTypes.ChangeVolume:
            return {
                ...state,
                players: state.players.map(p => {
                    if (p.cursor !== state.currentPlayer) {
                        return p;
                    }
                    return {
                        ...p,
                        volume: action.payload
                    };
                })
            };
        case PlayerActionTypes.VolumeUpdated:
            return {
                ...state,
                players: state.players.map(p => {
                    if (p.cursor !== action.cursor) {
                        return p;
                    }
                    return {
                        ...p,
                        volume: action.payload
                    };
                })
            };
        default:
            return state;
    }
}

export const selectPlayer = (state: State) => state.players.find(p => p.cursor === state.currentPlayer);
export const selectPlayingState = (state: State) => selectPlayer(state)?.playing;
export const selectCurrentTrack = (state: State) => selectPlayer(state)?.current;
export const selectVolume = (state: State) => selectPlayer(state)?.volume;
