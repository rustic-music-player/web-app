import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../../pages/search/search.service';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';
import { EMPTY, from, Observable } from 'rxjs';
import { QueueService } from '../../queue.service';
import { LibraryService } from '../../pages/library/library.service';
import { SearchResults } from '@rustic/http-client';

@Component({
    selector: 'rms-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    darkTheme = localStorage.darkTheme
        ? JSON.parse(localStorage.darkTheme)
        : false;

    searchControl = new FormControl();

    @Output('toggle-sidenav')
    toggleSidenav = new EventEmitter<void>();

    suggestions$: Observable<SearchResults>;

    hideSuggestions = true;

    constructor(
        private searchService: SearchService,
        private queueService: QueueService,
        private libraryService: LibraryService,
        private router: Router
    ) {
        this.suggestions$ = this.searchControl.valueChanges.pipe(
            filter((v) => v !== ''),
            debounceTime(200),
            tap(() => (this.hideSuggestions = false)),
            switchMap((query: string) => {
                if (query.startsWith('http')) {
                    return this.openUrl(query);
                }
                if (this.router.isActive('/search', false)) {
                    return from(this.search());
                }
                return this.searchService.query(query);
            })
        );
        this.searchService.query$.subscribe((query) =>
            this.searchControl.setValue(query, {
                emitEvent: false,
            })
        );
    }

    onToggleSidenav() {
        this.toggleSidenav.emit();
    }

    onToggleDarkTheme() {
        this.darkTheme = !this.darkTheme;
        localStorage.darkTheme = this.darkTheme;
        if (this.darkTheme) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }

    async search(): Promise<any> {
        this.searchService.search(this.searchControl.value);
        await this.router.navigateByUrl(
            `/search?query=${encodeURIComponent(this.searchControl.value)}`
        );
        this.hideSuggestions = true;
    }

    private openUrl(url: string): Observable<any> {
        return this.searchService.resolveExternalUrl(url).pipe(
            switchMap((result) => {
                switch (result.type) {
                    case 'album':
                        return this.router.navigateByUrl(
                            `/library/albums/${encodeURIComponent(
                                result.cursor
                            )}`
                        );
                    case 'artist':
                        return this.router.navigateByUrl(
                            `/library/artists/${encodeURIComponent(
                                result.cursor
                            )}`
                        );
                    case 'track':
                        return this.loadTrack(result.cursor);
                    case 'playlist':
                        return this.router.navigateByUrl(
                            `/playlists/${encodeURIComponent(result.cursor)}`
                        );
                }
            }),
            map((result) => {
                if (Array.isArray(result)) {
                    return result;
                }
                return [];
            })
        );
    }

    private loadTrack(cursor: string) {
        return this.libraryService.getTrack(cursor).pipe(
            map((track) => ({
                tracks: [track],
                playlists: [],
                albums: [],
                artists: [],
            }))
        );
    }

    showSuggestions() {
        this.hideSuggestions = false;
    }

    onSelectSuggestion() {
        this.hideSuggestions = true;
    }
}
