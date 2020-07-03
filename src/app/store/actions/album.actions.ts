import { Action } from '@ngrx/store';
import { AlbumModel } from '@rustic/http-client';

export enum AlbumActionTypes {
    Fetch = '[Library] Fetch Albums',
    FetchSuccess = '[Library] Fetch Albums Success',
    FetchError = '[Library] Fetch Albums Error',
    Open = '[Library] Open Album',
    Close = '[Library] Close Album',
    FetchSingle = '[Library] Fetch Album',
    FetchSingleSuccess = '[Library] Fetch Album Success',
    FetchSingleError = '[Library] Fetch Album Error',
    AddToLibrary = '[Library] Add Album',
    RemoveFromLibrary = '[Library] Remove Album'
}

export class FetchAlbums implements Action {
    readonly type = AlbumActionTypes.Fetch;
}

export class FetchAlbumsSuccess implements Action {
    readonly type = AlbumActionTypes.FetchSuccess;

    constructor(public payload: AlbumModel[]) {}
}

export class FetchAlbumsError implements Action {
    readonly type = AlbumActionTypes.FetchError;

    constructor(public error: any) {}
}

export class OpenAlbum implements Action {
    readonly type = AlbumActionTypes.Open;

    constructor(public payload: string) {}
}

export class CloseAlbum implements Action {
    readonly type = AlbumActionTypes.Close;
}

export class FetchAlbum implements Action {
    readonly type = AlbumActionTypes.FetchSingle;

    public payload: {
        cursor: string;
    };

    constructor(cursor: string) {
        this.payload = {
            cursor,
        };
    }
}

export class FetchAlbumSuccess implements Action {
    readonly type = AlbumActionTypes.FetchSingleSuccess;

    public payload: {
        album: AlbumModel;
    };

    constructor(album: AlbumModel) {
        this.payload = {
            album,
        };
    }
}

export class FetchAlbumError implements Action {
    readonly type = AlbumActionTypes.FetchSingleError;

    constructor(public error: any) {}
}

export class AddAlbum implements Action {
    readonly type = AlbumActionTypes.AddToLibrary;

    readonly payload: { cursor: string };

    constructor(cursor: string) {
        this.payload = { cursor };
    }
}

export class RemoveAlbum implements Action {
    readonly type = AlbumActionTypes.RemoveFromLibrary;

    readonly payload: { cursor: string };

    constructor(cursor: string) {
        this.payload = { cursor };
    }
}

export type AlbumActionsUnion =
    | FetchAlbums
    | FetchAlbumsSuccess
    | FetchAlbumsError
    | OpenAlbum
    | CloseAlbum
    | FetchAlbum
    | FetchAlbumSuccess
    | FetchAlbumError
    | AddAlbum
    | RemoveAlbum;
