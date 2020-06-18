import { Component } from '@angular/core';
import { PlaylistsService } from '../../pages/playlists/playlists.service';
import { defer } from 'rxjs';
import { ProviderTypeModel } from '@rustic/http-client';

@Component({
    selector: 'rms-editable-playlist-selection',
    templateUrl: './editable-playlist-selection.component.html',
    styleUrls: ['./editable-playlist-selection.component.scss'],
})
export class EditablePlaylistSelectionComponent {
    playlists$ = defer(() =>
        this.playlistsApi.getPlaylists(['internal' as ProviderTypeModel])
    );

    constructor(private playlistsApi: PlaylistsService) {}
}
