import { Component, OnInit } from '@angular/core';
import { QueueService } from '../../queue.service';
import { merge, Observable, Subject } from 'rxjs';
import { first, shareReplay } from 'rxjs/operators';
import { TrackModel } from '@rustic/http-client';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
    selector: 'rms-queue',
    templateUrl: './queue.component.html',
    styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
    private reorderedItems = new Subject<TrackModel[]>();

    queue$: Observable<TrackModel[]>;

    constructor(private api: QueueService) {
    }

    ngOnInit() {
        const queue$ = this.api.observe().pipe(shareReplay(1));
        this.queue$ = merge(queue$, this.reorderedItems);
    }

    clear() {
        this.api.clear().subscribe();
    }

    removeItem(index: number) {
        this.api.removeItem(index).subscribe();
    }

    onReorder(event: CdkDragDrop<TrackModel, any>) {
        this.queue$.pipe(first())
            .subscribe(queue => {
                const next = [...queue];
                const [item] = next.splice(event.previousIndex, 1);
                next.splice(event.currentIndex, 0, item);
                this.reorderedItems.next(next);
            });
        this.api.reorder(event.previousIndex, event.currentIndex).subscribe();
    }
}
