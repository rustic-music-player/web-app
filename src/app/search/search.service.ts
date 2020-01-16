import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Track } from '../contracts/track.model';
import { Album } from '../contracts/album.model';
import { Artist } from '../contracts/artist.model';
import { Playlist } from '../contracts/playlist.model';
import { OpenResult } from '../contracts/open-result.model';
import { RmsState, selectProviders } from '../store/reducers';
import { Store } from '@ngrx/store';
import { filter, map, switchMap, tap } from 'rxjs/operators';

export interface SearchResults {
    tracks: Track[],
    albums: Album[],
    artists: Artist[],
    playlists: Playlist[]
}

const EMPTY_RESULTS: SearchResults = {
    tracks: [],
    albums: [],
    artists: [],
    playlists: []
};

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    private _query$ = new BehaviorSubject<string>('');
    private _pending$ = new BehaviorSubject<boolean>(false);
    private _results$ = new BehaviorSubject<SearchResults>(EMPTY_RESULTS);

    constructor(private http: HttpClient,
                private store: Store<RmsState>) {
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

    private setup() {
        const query$ = this.query$.pipe(filter(query => query !== ''));
        const providers$ = this.store.select(selectProviders)
            .pipe(
                map(providers => providers
                    .filter(p => p.selected)
                    .map(p => p.provider)));
        providers$.pipe(
                switchMap(providers => query$.pipe(map(query => ({
                    providers,
                    query
                })))),
                tap(() => {
                    this._pending$.next(true);
                }),
                switchMap((({ providers, query }) =>
                    this.http
                        .get<any>('/api/search', {
                            params: {
                                query,
                                'providers[]': providers
                            }
                        })))
            )
            .subscribe(results => {
                this._results$.next(results);
                this._pending$.next(false);
            });
    }

    query(query: string) {
        console.log('query');
        this._query$.next(query);
        this._results$.next(EMPTY_RESULTS);
    }

    resolveExternalUrl(url: string): Observable<OpenResult> {
        return this.http.get<OpenResult>(`api/open/${encodeURIComponent(btoa(url))}`);
    }
}
