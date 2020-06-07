import { Component, OnInit } from '@angular/core';
import { QueueService } from '../../queue.service';
import { merge, Observable, Subject } from 'rxjs';
import { first, shareReplay, switchMap } from 'rxjs/operators';
import { QueuedTrackModel, TrackModel } from '@rustic/http-client';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { RmsState } from '../../store/reducers';
import { select, Store } from '@ngrx/store';

@Component({
    selector: 'rms-queue',
    templateUrl: './queue.component.html',
    styleUrls: ['./queue.component.scss'],
})
export class QueueComponent implements OnInit {
    private reorderedItems = new Subject<QueuedTrackModel[]>();

    queue$: Observable<QueuedTrackModel[]>;

    constructor(private api: QueueService, private store: Store<RmsState>) {}

    ngOnInit() {
        const queue$ = this.store.pipe(
            select((s) => s.player.currentPlayer),
            switchMap((player) => this.api.observe(player)),
            shareReplay(1)
        );
        this.queue$ = merge(queue$, this.reorderedItems);
    }

    clear() {
        this.withPlayer((player) => this.api.clear(player)).subscribe();
    }

    removeItem(index: number) {
        this.withPlayer((player) =>
            this.api.removeItem(player, index)
        ).subscribe();
    }

    onReorder(event: CdkDragDrop<TrackModel, any>) {
        this.queue$.pipe(first()).subscribe((queue) => {
            const next = [...queue];
            const [item] = next.splice(event.previousIndex, 1);
            next.splice(event.currentIndex, 0, item);
            this.reorderedItems.next(next);
        });
        this.withPlayer((player) =>
            this.api.reorder(player, event.previousIndex, event.currentIndex)
        ).subscribe();
    }

    private withPlayer(
        call: (player: string) => Observable<void>
    ): Observable<void> {
        return this.store.pipe(
            select((s) => s.player.currentPlayer),
            first(),
            switchMap((player) => call(player))
        );
    }
}
