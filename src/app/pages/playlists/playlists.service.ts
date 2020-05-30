import { Injectable } from '@angular/core';
import { PlaylistModel } from '@rustic/http-client';
import { from, Observable } from 'rxjs';
import { ApiClient } from '../../contracts/api-client';
import { ProviderTypeModel } from '@rustic/http-client';

@Injectable()
export class PlaylistsService {
    constructor(private client: ApiClient) {
    }

    getPlaylists(providers: ProviderTypeModel[]): Observable<PlaylistModel[]> {
        return from(this.client.getPlaylists(providers));
    }

    getPlaylist(cursor: string): Observable<PlaylistModel> {
        return from(this.client.getPlaylist(cursor));
    }
}
