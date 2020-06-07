import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../search/search.service';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QueueService } from '../queue.service';
import { LibraryService } from '../pages/library/library.service';
import { TrackModel } from '@rustic/http-client';

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

    suggestions$: Observable<TrackModel[]>;

    constructor(
        private searchService: SearchService,
        private queueService: QueueService,
        private libraryService: LibraryService,
        private router: Router
    ) {
        this.suggestions$ = this.searchControl.valueChanges.pipe(
            debounceTime(500),
            switchMap((query: string) => {
                if (query.startsWith('http')) {
                    return this.openUrl(query);
                } else {
                    return this.search(query);
                }
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

    private async search(query: string): Promise<any> {
        this.searchService.query(query);
        await this.router.navigateByUrl(
            `/search?query=${encodeURIComponent(query)}`
        );
        return Promise.resolve([]);
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
                        return this.showTrack(result.cursor);
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

    private showTrack(cursor: string) {
        return this.libraryService
            .getTrack(cursor)
            .pipe(map((track) => [track]));
    }
}
