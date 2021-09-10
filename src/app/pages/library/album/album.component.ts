import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { QueueService } from '../../../queue.service';
import { AlbumModel } from '@rustic/http-client';
import { RmsState, selectCurrentAlbum } from '../../../store/reducers';
import { select, Store } from '@ngrx/store';
import { first, switchMap } from 'rxjs/operators';
import { AddAlbum, RemoveAlbum } from '../../../store/actions/album.actions';

@Component({
    selector: 'rms-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.scss'],
})
export class AlbumComponent {
    album$: Observable<AlbumModel>;

    constructor(private store: Store<RmsState>, private queue: QueueService) {
        this.album$ = this.store.pipe(select(selectCurrentAlbum));
    }

    queueAlbum(album: AlbumModel) {
        this.store
            .pipe(
                select((s) => s.player.currentPlayer),
                first(),
                switchMap((player) => this.queue.queueAlbum(player, album))
            )
            .subscribe();
    }

    playAlbumNow(album: AlbumModel) {
        this.store
            .pipe(
                select((s) => s.player.currentPlayer),
                first(),
                switchMap((player) =>
                    this.queue
                        .clear(player)
                        .pipe(
                            switchMap(() =>
                                this.queue.queueAlbum(player, album)
                            )
                        )
                )
            )
            .subscribe();
    }

    addToLibrary(cursor: string) {
        this.store.dispatch(new AddAlbum(cursor));
    }

    removeFromLibrary(cursor: string) {
        this.store.dispatch(new RemoveAlbum(cursor));
    }
}
