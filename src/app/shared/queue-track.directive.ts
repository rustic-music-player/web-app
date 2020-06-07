import { Directive, HostListener, Input } from '@angular/core';
import { TrackModel } from '@rustic/http-client';
import { QueueService } from '../queue.service';
import { RmsState } from '../store/reducers';
import { select, Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

@Directive({
    selector: '[rmsQueueTrack]',
})
export class QueueTrackDirective {
    @Input('rmsQueueTrack')
    track: TrackModel;

    constructor(private queue: QueueService, private store: Store<RmsState>) {}

    @HostListener('click')
    async onClick() {
        const cursor = await this.store
            .pipe(
                select((s) => s.player.currentPlayer),
                first()
            )
            .toPromise();
        await this.queue.queueTrack(cursor, this.track).toPromise();
    }
}
