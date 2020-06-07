import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QueuedTrackModel, TrackModel } from '@rustic/http-client';
import { QueueService } from '../../queue.service';
import { shareReplay, switchMap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { RmsState, selectCurrentTrack } from '../../store/reducers';

@Component({
    selector: 'rms-player-page',
    templateUrl: './player-page.component.html',
    styleUrls: ['./player-page.component.scss'],
})
export class PlayerPageComponent {
    current$: Observable<TrackModel | null>;
    queue$: Observable<QueuedTrackModel[]>;

    constructor(private api: QueueService, private store: Store<RmsState>) {
        this.current$ = this.store.pipe(select(selectCurrentTrack));
        const player$ = this.store.pipe(select((s) => s.player.currentPlayer));
        this.queue$ = player$.pipe(
            switchMap((player) => this.api.observe(player)),
            shareReplay(1)
        );
    }
}
