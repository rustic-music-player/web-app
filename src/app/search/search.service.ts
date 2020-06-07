import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, from, Observable } from 'rxjs';
import {
    AlbumModel,
    ArtistModel,
    OpenResultModel,
    PlaylistModel,
    TrackModel,
} from '@rustic/http-client';
import { RmsState, selectProviders } from '../store/reducers';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { ApiClient } from '../contracts/api-client';

export interface SearchResults {
    tracks: TrackModel[];
    albums: AlbumModel[];
    artists: ArtistModel[];
    playlists: PlaylistModel[];
}

const EMPTY_RESULTS: SearchResults = {
    tracks: [],
    albums: [],
    artists: [],
    playlists: [],
};

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    private _query$ = new BehaviorSubject<string>('');
    private _pending$ = new BehaviorSubject<boolean>(false);
    private _results$ = new BehaviorSubject<SearchResults>(EMPTY_RESULTS);

    constructor(private client: ApiClient, private store: Store<RmsState>) {
        this.setup();
    }

    get results$(): Observable<SearchResults> {
        return this._results$.asObservable();
    }

    get pending$(): Observable<boolean> {
        return this._pending$.asObservable();
    }

    get query$(): Observable<string> {
        return this._query$.asObservable();
    }

    resolveExternalUrl(url: string): Observable<OpenResultModel> {
        return from(this.client.openShareUrl(url));
    }

    query(query: string) {
        this._query$.next(query);
        this._results$.next(EMPTY_RESULTS);
    }

    private setup() {
        const query$ = this.query$.pipe(filter((query) => query !== ''));
        const providers$ = this.store
            .select(selectProviders)
            .pipe(
                map((providers) =>
                    providers.filter((p) => p.selected).map((p) => p.provider)
                )
            );
        combineLatest([query$, providers$])
            .pipe(
                tap(() => this._pending$.next(true)),
                switchMap(([query, providers]) =>
                    this.client.search(query, providers)
                )
            )
            .subscribe((results: any) => {
                this._results$.next(results);
                this._pending$.next(false);
            });
    }
}
