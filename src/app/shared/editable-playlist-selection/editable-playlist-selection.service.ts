import { Observable } from 'rxjs';
import { PlaylistModel } from '@rustic/http-client';
import { MatDialog } from '@angular/material/dialog';
import { EditablePlaylistSelectionComponent } from './editable-playlist-selection.component';
import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EditablePlaylistSelectionService {
    constructor(private dialog: MatDialog) {}

    selectPlaylist(): Observable<PlaylistModel> {
        return this.dialog
            .open(EditablePlaylistSelectionComponent)
            .afterClosed()
            .pipe(filter((m) => m != null));
    }
}
