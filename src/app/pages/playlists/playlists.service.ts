import { Injectable } from '@angular/core';
import { Playlist } from '../../contracts/playlist.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RusticUrlEncodingCoded } from '../../url-encoding-codec';

@Injectable()
export class PlaylistsService {
    constructor(private http: HttpClient) {
    }

    getPlaylists(providers: string[]): Observable<Playlist[]> {
        let params = new HttpParams({ encoder: new RusticUrlEncodingCoded() });
        for (let provider of providers) {
            params = params.append('providers[]', provider);
        }
        return this.http.get<Playlist[]>('/api/library/playlists', {
            params
        });
    }

    getPlaylist(cursor: string): Observable<Playlist> {
        return this.http.get<Playlist>(`/api/library/playlists/${cursor}`);
    }
}
