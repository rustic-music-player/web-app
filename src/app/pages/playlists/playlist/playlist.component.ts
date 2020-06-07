import { Component, OnInit } from '@angular/core';
import { PlaylistsService } from '../playlists.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PlaylistModel } from '@rustic/http-client';
import { QueueService } from '../../../queue.service';
import { first, switchMap } from 'rxjs/operators';
import { RmsState } from '../../../store/reducers';
import { select, Store } from '@ngrx/store';

@Component({
    selector: 'rms-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
    playlist$: Observable<PlaylistModel>;

    constructor(private playlistsService: PlaylistsService,
                private activatedRoute: ActivatedRoute,
                private queue: QueueService,
                private store: Store<RmsState>) {
    }

    ngOnInit() {
        this.playlist$ = this.activatedRoute.params.pipe(switchMap(({playlist_cursor}) => this.playlistsService.getPlaylist(playlist_cursor)));
    }

    queuePlaylist(playlist: PlaylistModel) {
        this.store.pipe(
            select(s => s.player.currentPlayer),
            first(),
            switchMap(player => this.queue.queuePlaylist(player, playlist))
        ).subscribe();
    }
}
