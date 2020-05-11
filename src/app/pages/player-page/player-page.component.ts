import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from '../../contracts/track.model';
import { QueueService } from '../../queue.service';
import { shareReplay } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { RmsState, selectCurrentTrack } from '../../store/reducers';

@Component({
  selector: 'rms-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.scss']
})
export class PlayerPageComponent implements OnInit {
    current$: Observable<Track | null>;
    queue$: Observable<Track[]>;

    constructor(private api: QueueService,
                private store: Store<RmsState>
                ) {
        this.current$ = this.store.pipe(select(selectCurrentTrack));
    }

    ngOnInit() {
        this.queue$ = this.api.observe().pipe(shareReplay(1));
    }
}
