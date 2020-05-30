import { Component, OnInit } from '@angular/core';
import { PlaylistsService } from '../playlists.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PlaylistModel, TrackModel } from '@rustic/http-client';
import { QueueService } from '../../../queue.service';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'rms-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
    playlist$: Observable<PlaylistModel>;

    constructor(private playlistsService: PlaylistsService,
                private activatedRoute: ActivatedRoute,
                private queue: QueueService) {
    }

    ngOnInit() {
        this.playlist$ = this.activatedRoute.params.pipe(switchMap(({playlist_cursor}) => this.playlistsService.getPlaylist(playlist_cursor)));
    }

    queuePlaylist(playlist: PlaylistModel) {
        this.queue
            .queuePlaylist(playlist)
            .subscribe();
    }

    queueTrack(track: TrackModel) {
        this.queue
            .queueTrack(track)
            .subscribe();
    }
}
