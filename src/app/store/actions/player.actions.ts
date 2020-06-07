import { Action } from '@ngrx/store';
import { TrackModel, PlayerModel } from '@rustic/http-client';

export enum PlayerActionTypes {
    FetchPlayers = '[Players] Fetch',
    Play = '[Player] Play',
    Pause = '[Player] Pause',
    Stop = '[Player] Stop',
    Prev = '[Player] Prev',
    Next = '[Player] Next',
    CurrentTrackUpdated = '[Player] Current Track Updated',
    StateUpdated = '[Player] State Updated',
    VolumeUpdated = '[Player] Volume Updated',
    ChangeVolume = '[Player] Change Volume',
    SelectPlayer = '[Player] Select Player',
}

export class FetchPlayers implements Action {
    readonly type = PlayerActionTypes.FetchPlayers;

    readonly payload: { players: PlayerModel[] };

    constructor(players: PlayerModel[]) {
        this.payload = {
            players,
        };
    }
}

export class PlayerPlay implements Action {
    readonly type = PlayerActionTypes.Play;
}

export class PlayerPause implements Action {
    readonly type = PlayerActionTypes.Pause;
}

export class PlayerStop implements Action {
    readonly type = PlayerActionTypes.Stop;
}

export class PlayerPrev implements Action {
    readonly type = PlayerActionTypes.Prev;
}

export class PlayerNext implements Action {
    readonly type = PlayerActionTypes.Next;
}

export class PlayerCurrentTrackUpdated implements Action {
    readonly type = PlayerActionTypes.CurrentTrackUpdated;

    constructor(public cursor: string, public payload: TrackModel | null) {}
}

export class PlayerStateUpdated implements Action {
    readonly type = PlayerActionTypes.StateUpdated;

    constructor(public cursor: string, public payload: boolean) {}
}

export class PlayerVolumeUpdated implements Action {
    readonly type = PlayerActionTypes.VolumeUpdated;

    constructor(public cursor: string, public payload: number) {}
}

export class ChangePlayerVolume implements Action {
    readonly type = PlayerActionTypes.ChangeVolume;

    constructor(public payload: number) {}
}

export class SelectPlayer implements Action {
    readonly type = PlayerActionTypes.SelectPlayer;

    public payload: {
        cursor: string;
    };

    constructor(player: PlayerModel) {
        this.payload = {
            cursor: player.cursor,
        };
    }
}

export type PlayerActionsUnion =
    | PlayerPlay
    | PlayerPause
    | PlayerStop
    | PlayerPrev
    | PlayerNext
    | PlayerCurrentTrackUpdated
    | PlayerStateUpdated
    | PlayerVolumeUpdated
    | ChangePlayerVolume
    | FetchPlayers
    | SelectPlayer;
