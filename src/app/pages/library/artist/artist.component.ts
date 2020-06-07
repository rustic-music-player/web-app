import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistModel, PlaylistModel } from '@rustic/http-client';
import { select, Store } from '@ngrx/store';
import { RmsState, selectCurrentArtist } from '../../../store/reducers';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'rms-artist',
    templateUrl: './artist.component.html',
    styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent {
    artist$: Observable<ArtistModel>;
    topTracks$: Observable<PlaylistModel>;
    playlists$: Observable<PlaylistModel[]>;

    constructor(private store: Store<RmsState>) {
        this.artist$ = this.store.pipe(select(selectCurrentArtist));
        this.topTracks$ = this.artist$.pipe(
            filter((a) => a != null),
            map((artist) =>
                artist.playlists.find((p) => p.title === 'Top Tracks')
            )
        );
        this.playlists$ = this.artist$.pipe(
            filter((a) => a != null),
            map((artist) =>
                artist.playlists.filter((p) => p.title !== 'Top Tracks')
            )
        );
    }
}
