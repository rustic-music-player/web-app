import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { merge, Observable } from 'rxjs';
import { Track } from './contracts/track.model';
import { Playlist } from './contracts/playlist.model';
import { filter, switchMap } from 'rxjs/operators';
import { Messages, SocketService } from './socket.service';
import { Album } from './contracts/album.model';

@Injectable()
export class QueueService {

    constructor(private http: HttpClient,
                private socket: SocketService) {
    }

    queueTrack(track: Track): Observable<void> {
        return this.http.post<void>(`/api/queue/track/${track.cursor}`, null);
    }

    queuePlaylist(playlist: Playlist): Observable<void> {
        return this.http.post<void>(`/api/queue/playlist/${playlist.cursor}`, null);
    }

    queueAlbum(album: Album): Observable<void> {
        return this.http.post<void>(`/api/queue/album/${album.cursor}`, null);
    }

    get(): Observable<Track[]> {
        return this.http.get<Track[]>('/api/queue');
    }

    clear(): Observable<void> {
        return this.http.post<void>('/api/queue/clear', null);
    }

    observe(): Observable<Track[]> {
        const initalFetch = this.get();
        const updates = this.socket.ws$.pipe(filter(({type}) => type === Messages.QueueUpdated), switchMap(() => this.get()));
        return merge(initalFetch, updates);
    }

    removeItem(index: number): Observable<void> {
        return this.http.delete<void>(`api/queue/${index}`);
    }

    reorder(before: number, after: number): Observable<void> {
        return this.http.post<void>(`api/queue/reorder/${before}/${after}`, null);
    }
}
