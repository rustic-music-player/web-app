import { Action } from '@ngrx/store';
import { ArtistModel } from '@rustic/http-client';

export enum ArtistActionTypes {
    Fetch = '[Library] Fetch Artists',
    FetchSuccess = '[Library] Fetch Artists Success',
    FetchError = '[Library] Fetch Artists Error',
    Open = '[Library] Open Artist',
    Close = '[Library] Close Artist'
}

export class FetchArtists implements Action {
    readonly type = ArtistActionTypes.Fetch;
}

export class FetchArtistsSuccess implements Action {
    readonly type = ArtistActionTypes.FetchSuccess;

    constructor(public payload: ArtistModel[]) {
    }
}

export class FetchArtistsError implements Action {
    readonly type = ArtistActionTypes.FetchError;

    constructor(public error: any) {}
}

export class OpenArtist implements Action {
    readonly type = ArtistActionTypes.Open;

    constructor(public payload: string) {
    }
}

export class CloseArtist implements Action {
    readonly type = ArtistActionTypes.Close;
}

export type ArtistActionsUnion = FetchArtists |
    FetchArtistsSuccess |
    FetchArtistsError |
    OpenArtist |
    CloseArtist;
