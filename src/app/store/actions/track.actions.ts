import { Action } from '@ngrx/store';
import { TrackModel } from '@rustic/http-client';

export enum TrackActionTypes {
    Fetch = '[Library] Fetch Tracks',
    FetchSuccess = '[Library] Fetch Tracks Success',
    FetchError = '[Library] Fetch Tracks Error',
}

export class FetchTracks implements Action {
    readonly type = TrackActionTypes.Fetch;
}

export class FetchTracksSuccess implements Action {
    readonly type = TrackActionTypes.FetchSuccess;

    constructor(public payload: TrackModel[]) {}
}

export class FetchTracksError implements Action {
    readonly type = TrackActionTypes.FetchError;

    constructor(public error: any) {}
}

export type TrackActionsUnion =
    | FetchTracks
    | FetchTracksSuccess
    | FetchTracksError;
