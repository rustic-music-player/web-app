import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrackModel } from '@rustic/http-client';
import { select, Store } from '@ngrx/store';
import { RmsState, selectAllTracks } from '../../../store/reducers';
import { FetchTracks } from '../../../store/actions/track.actions';

@Component({
    selector: 'rms-tracks',
    templateUrl: './tracks.component.html',
    styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {
    tracks$: Observable<TrackModel[]>;

    constructor(private store: Store<RmsState>) {
        this.tracks$ = this.store.pipe(select(selectAllTracks));
    }

    ngOnInit() {
        this.store.dispatch(new FetchTracks());
    }

    trackTrack(index: number, track: TrackModel): string {
        return track.cursor;
    }
}
