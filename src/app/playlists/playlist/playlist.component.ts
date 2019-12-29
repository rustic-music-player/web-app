import { Component, OnInit } from '@angular/core';
import { PlaylistsService } from '../playlists.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Playlist } from '../../contracts/playlist.model';
import { Track } from '../../contracts/track.model';
import { QueueService } from '../../queue.service';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'rms-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
    playlist$: Observable<Playlist>;

    constructor(private playlistsService: PlaylistsService,
                private activatedRoute: ActivatedRoute,
                private queue: QueueService) {
    }

    ngOnInit() {
        this.playlist$ = this.activatedRoute.params.pipe(switchMap(({playlist_cursor}) => this.playlistsService.getPlaylist(playlist_cursor)));
    }

    queuePlaylist(playlist: Playlist) {
        this.queue
            .queuePlaylist(playlist)
            .subscribe();
    }

    queueTrack(track: Track) {
        this.queue
            .queueTrack(track)
            .subscribe();
    }
}
