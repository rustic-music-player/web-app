import { Directive, HostListener, Input } from '@angular/core';
import { TrackModel } from '@rustic/http-client';
import { QueueService } from '../queue.service';

@Directive({
  selector: '[rmsQueueTrack]'
})
export class QueueTrackDirective {

    @Input('rmsQueueTrack')
    track: TrackModel;

    constructor(private queue: QueueService) {
    }

    @HostListener('click')
    onClick() {
        this.queue.queueTrack(this.track).subscribe();
    }
}
