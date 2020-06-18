import { Component } from '@angular/core';
import { PlaylistsService } from '../playlists.service';
import { merge, Observable, of, Subject } from 'rxjs';
import { PlaylistModel } from '@rustic/http-client';
import { Store } from '@ngrx/store';
import { RmsState, selectProviders } from '../../../store/reducers';
import { map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddPlaylistDialogComponent } from '../add-playlist-dialog/add-playlist-dialog.component';

@Component({
    selector: 'rms-playlists',
    templateUrl: './playlists.component.html',
    styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent {
    private refresh$ = new Subject();
    playlists$: Observable<PlaylistModel[]>;

    constructor(
        private store: Store<RmsState>,
        private playlists: PlaylistsService,
        private dialog: MatDialog
    ) {
        const providers$ = this.store
            .select(selectProviders)
            .pipe(
                map((providers) =>
                    providers.filter((p) => p.selected).map((p) => p.provider)
                )
            );
        const poll$ = merge(of(null), this.refresh$);
        this.playlists$ = poll$.pipe(
            switchMap(() => providers$),
            switchMap((providers) => playlists.getPlaylists(providers))
        );
    }

    addPlaylist() {
        this.dialog
            .open(AddPlaylistDialogComponent)
            .afterClosed()
            .subscribe(() => this.refresh());
    }

    private refresh() {
        this.refresh$.next();
    }
}
