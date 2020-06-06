import { Injectable } from '@angular/core';
import { from, merge, Observable } from 'rxjs';
import { AlbumModel, PlaylistModel, QueuedTrackModel, TrackModel } from '@rustic/http-client';
import { filter, switchMap } from 'rxjs/operators';
import { Messages, SocketService } from './socket.service';
import { ApiClient } from './contracts/api-client';

@Injectable()
export class QueueService {

    constructor(private client: ApiClient,
                private socket: SocketService) {
    }

    queueTrack(track: TrackModel): Observable<void> {
        return from(this.client.queueTrack(null, track.cursor));
    }

    queuePlaylist(playlist: PlaylistModel): Observable<void> {
        return from(this.client.queuePlaylist(null, playlist.cursor));
    }

    queueAlbum(album: AlbumModel): Observable<void> {
        return from(this.client.queueAlbum(null, album.cursor));
    }

    get(): Observable<QueuedTrackModel[]> {
        return from(this.client.getQueue(null));
    }

    clear(): Observable<void> {
        return from(this.client.clearQueue(null));
    }

    observe(): Observable<QueuedTrackModel[]> {
        const initalFetch = this.get();
        const updates = this.socket.ws$.pipe(filter(({ type }) => type === Messages.QueueUpdated || type === Messages.CurrentlyPlayingChanged), switchMap(() => this.get()));
        return merge(initalFetch, updates);
    }

    removeItem(index: number): Observable<void> {
        return from(this.client.removeQueueItem(null, index));
    }

    reorder(before: number, after: number): Observable<void> {
        return from(this.client.reorderQueueItem(null, before, after));
    }
}
