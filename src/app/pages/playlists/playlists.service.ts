import { Injectable } from '@angular/core';
import { PlaylistModel, TrackModel } from '@rustic/http-client';
import { from, Observable } from 'rxjs';
import { ApiClient } from '../../contracts/api-client';
import { ProviderTypeModel } from '@rustic/http-client';

@Injectable({ providedIn: 'root' })
export class PlaylistsService {
    constructor(private client: ApiClient) {}

    getPlaylists(providers: ProviderTypeModel[]): Observable<PlaylistModel[]> {
        return from(this.client.getPlaylists(providers));
    }

    getPlaylist(cursor: string): Observable<PlaylistModel> {
        return from(this.client.getPlaylist(cursor));
    }

    addPlaylist(name: string): Observable<PlaylistModel> {
        return from(this.client.addPlaylist(name));
    }

    addTrackToPlaylist(track: TrackModel, playlist: PlaylistModel) {
        return from(
            this.client.addTrackToPlaylist(playlist.cursor, track.cursor)
        );
    }
}
