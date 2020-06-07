import { Injectable } from '@angular/core';
import { from, merge, Observable } from 'rxjs';
import {
    AlbumModel,
    PlaylistModel,
    QueuedTrackModel,
    TrackModel,
} from '@rustic/http-client';
import { filter, switchMap } from 'rxjs/operators';
import { Messages, SocketService } from './socket.service';
import { ApiClient } from './contracts/api-client';

@Injectable()
export class QueueService {
    constructor(private client: ApiClient, private socket: SocketService) {}

    queueTrack(player: string, track: TrackModel): Observable<void> {
        return from(this.client.queueTrack(player, track.cursor));
    }

    queuePlaylist(player: string, playlist: PlaylistModel): Observable<void> {
        return from(this.client.queuePlaylist(player, playlist.cursor));
    }

    queueAlbum(player: string, album: AlbumModel): Observable<void> {
        return from(this.client.queueAlbum(player, album.cursor));
    }

    get(player: string): Observable<QueuedTrackModel[]> {
        return from(this.client.getQueue(player));
    }

    clear(player: string): Observable<void> {
        return from(this.client.clearQueue(player));
    }

    observe(player: string): Observable<QueuedTrackModel[]> {
        const initalFetch = this.get(player);
        const updates = this.socket.ws$.pipe(
            filter(({ player_cursor }) => player_cursor === player),
            filter(
                ({ type }) =>
                    type === Messages.QueueUpdated ||
                    type === Messages.CurrentlyPlayingChanged
            ),
            switchMap(() => this.get(player))
        );
        return merge(initalFetch, updates);
    }

    selectItem(player: string, index: number): Observable<void> {
        return from(this.client.selectQueueItem(player, index));
    }

    removeItem(player: string, index: number): Observable<void> {
        return from(this.client.removeQueueItem(player, index));
    }

    reorder(player: string, before: number, after: number): Observable<void> {
        return from(this.client.reorderQueueItem(player, before, after));
    }
}
