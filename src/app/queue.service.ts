import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Track } from './contracts/track.model';
import { Playlist } from './contracts/playlist.model';

@Injectable()
export class QueueService {

    constructor(private http: HttpClient) {
    }

    queueTrack(track: Track): Observable<void> {
        return this.http.post<void>(`/api/queue/track/${track.cursor}`, null);
    }

    queuePlaylist(playlist: Playlist): Observable<void> {
        return this.http.post<void>(`/api/queue/playlist/${playlist.cursor}`, null);
    }

    get(): Observable<Track[]> {
        return this.http.get<Track[]>('/api/queue');
    }
}
