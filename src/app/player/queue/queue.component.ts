import { Component, OnInit } from '@angular/core';
import { QueueService } from '../../queue.service';
import { merge, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Track } from '../../contracts/track.model';
import { Messages, SocketService } from '../../socket.service';

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
        const initalFetch = this.api.get();
        const updates = this.socket.ws$.pipe(filter(({type}) => type === Messages.QueueUpdated), switchMap(() => this.api.get()));
        this.queue$ = merge(initalFetch, updates);
    }

}
