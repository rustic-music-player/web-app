import { Component } from '@angular/core';
import { PlaylistsService } from '../playlists.service';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'rms-add-playlist-dialog',
    templateUrl: './add-playlist-dialog.component.html',
    styleUrls: ['./add-playlist-dialog.component.scss'],
})
export class AddPlaylistDialogComponent {
    nameControl = new FormControl();

    constructor(
        private dialogRef: MatDialogRef<AddPlaylistDialogComponent>,
        private playlistsApi: PlaylistsService
    ) {}

    onSubmit() {
        this.playlistsApi.addPlaylist(this.nameControl.value).subscribe(() => {
            this.dialogRef.close();
        });
    }
}
