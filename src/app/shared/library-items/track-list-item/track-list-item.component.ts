import { Component, Input } from '@angular/core';
import { TrackModel } from '@rustic/http-client';
import { EditablePlaylistSelectionService } from '../../editable-playlist-selection/editable-playlist-selection.service';
import { PlaylistsService } from '../../../pages/playlists/playlists.service';
import { map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'rms-track-list-item',
    templateUrl: './track-list-item.component.html',
    styleUrls: ['./track-list-item.component.scss'],
})
export class TrackListItemComponent {
    @Input()
    track: TrackModel;

    @Input()
    showCoverart = true;

    constructor(
        private editablePlaylistSelection: EditablePlaylistSelectionService,
        private playlistsService: PlaylistsService,
        private snackbar: MatSnackBar
    ) {}

    addToPlaylist() {
        this.editablePlaylistSelection
            .selectPlaylist()
            .pipe(
                switchMap((playlist) =>
                    this.playlistsService
                        .addTrackToPlaylist(this.track, playlist)
                        .pipe(map(() => playlist))
                )
            )
            .subscribe((playlist) =>
                this.snackbar.open(
                    `${this.track.title} added to playlist ${playlist.title}`,
                    null,
                    {
                        duration: 2500,
                    }
                )
            );
    }
}
