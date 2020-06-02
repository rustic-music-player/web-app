import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import {
    ArtistActionTypes, CloseArtist,
    FetchArtist, FetchArtistError,
    FetchArtistsError,
    FetchArtistsSuccess, FetchArtistSuccess,
    OpenArtist
} from '../actions/artist.actions';
import { LibraryService } from '../../pages/library/library.service';
import { of } from 'rxjs';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { RouterState } from '../reducers/router.reducer';

@Injectable()
export class ArtistEffects {

    @Effect() fetch$ = this.actions$.pipe(
        ofType(ArtistActionTypes.Fetch),
        switchMap(() => this.libraryApi.getArtists().pipe(
            map(artists => new FetchArtistsSuccess(artists)),
            catchError(err => of(new FetchArtistsError(err)))
        ))
    );

    @Effect() open$ = this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        filter(({ payload }: RouterNavigationAction<RouterState>) => 'artist_cursor' in payload.routerState.params),
        map(({ payload }: RouterNavigationAction<RouterState>) => payload.routerState.params.artist_cursor),
        map(id => new OpenArtist(id))
    );

    @Effect() close$ = this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        filter(({ payload }: RouterNavigationAction<RouterState>) => !('artist_cursor' in payload.routerState.params)),
        map(() => new CloseArtist())
    );

    @Effect() openSingle$ = this.actions$.pipe(
        ofType(ArtistActionTypes.Open),
        map(({ payload }: OpenArtist) => payload),
        map(id => new FetchArtist(id))
    );

    @Effect() fetchSingle$ = this.actions$.pipe(
        ofType(ArtistActionTypes.FetchSingle),
        map(({ payload }: FetchArtist) => payload.cursor),
        switchMap(cursor => this.libraryApi.getArtist(cursor).pipe(
            map(artist => new FetchArtistSuccess(artist)),
            catchError(err => of(new FetchArtistError(err)))
        ))
    );

    constructor(private actions$: Actions,
                private libraryApi: LibraryService) {
    }
}
