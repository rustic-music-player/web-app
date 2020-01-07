import { Directive, HostListener, Input } from '@angular/core';
import { Track } from '../contracts/track.model';
import { QueueService } from '../queue.service';

@Directive({
  selector: '[rmsQueueTrack]'
})
export class QueueTrackDirective {

    @Input('rmsQueueTrack')
    track: Track;

    constructor(private queue: QueueService) {
    }

    @HostListener('click')
    onClick() {
        this.queue.queueTrack(this.track).subscribe();
    }
}
