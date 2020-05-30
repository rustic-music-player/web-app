import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistModel } from '@rustic/http-client';
import { RmsState, selectAllArtists } from '../../../store/reducers';
import { select, Store } from '@ngrx/store';
import { FetchArtists } from '../../../store/actions/artist.actions';

@Component({
    selector: 'rms-artists',
    templateUrl: './artists.component.html',
    styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
    artists$: Observable<ArtistModel[]>;

    constructor(private store: Store<RmsState>) {
        this.artists$ = this.store.pipe(select(selectAllArtists));
    }

    ngOnInit() {
        this.store.dispatch(new FetchArtists());
    }
}
