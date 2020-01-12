import { Component, OnInit } from '@angular/core';
import { QueueService } from '../../queue.service';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Track } from '../../contracts/track.model';
import { SocketService } from '../../socket.service';

@Component({
    selector: 'rms-queue',
    templateUrl: './queue.component.html',
    styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

    queue$: Observable<Track[]>;

    constructor(private api: QueueService,
                private socket: SocketService) {
    }

    ngOnInit() {
        this.queue$ = this.api.observe().pipe(shareReplay(1));
    }

    clear() {
        this.api.clear().subscribe();
    }
}
