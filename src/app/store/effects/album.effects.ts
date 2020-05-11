import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import {
    AlbumActionTypes,
    CloseAlbum,
    FetchAlbum,
    FetchAlbumError,
    FetchAlbumsError,
    FetchAlbumsSuccess,
    FetchAlbumSuccess,
    OpenAlbum
} from '../actions/album.actions';
import { LibraryService } from '../../pages/library/library.service';
import { of } from 'rxjs';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { RouterState } from '../reducers/router.reducer';

@Injectable()
export class AlbumEffects {

    @Effect() fetch$ = this.actions$.pipe(
        ofType(AlbumActionTypes.Fetch),
        switchMap(() => this.libraryApi.getAlbums().pipe(
            map(albums => new FetchAlbumsSuccess(albums)),
            catchError(err => of(new FetchAlbumsError(err)))
        ))
    );

    @Effect() open$ = this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        filter(({ payload }: RouterNavigationAction<RouterState>) => 'album_cursor' in payload.routerState.params),
        map(({ payload }: RouterNavigationAction<RouterState>) => payload.routerState.params.album_cursor),
        map(id => new OpenAlbum(id))
    );

    @Effect() close$ = this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        filter(({ payload }: RouterNavigationAction<RouterState>) => !('album_cursor' in payload.routerState.params)),
        map(() => new CloseAlbum())
    );

    @Effect() openSingle$ = this.actions$.pipe(
        ofType(AlbumActionTypes.Open),
        map(({ payload }: OpenAlbum) => payload),
        map(id => new FetchAlbum(id))
    );

    @Effect() fetchSingle$ = this.actions$.pipe(
        ofType(AlbumActionTypes.FetchSingle),
        map(({ payload }: FetchAlbum) => payload.cursor),
        switchMap(cursor => this.libraryApi.getAlbum(cursor).pipe(
            map(album => new FetchAlbumSuccess(album)),
            catchError(err => of(new FetchAlbumError(err)))
        ))
    );

    constructor(private actions$: Actions,
                private libraryApi: LibraryService) {
    }
}
