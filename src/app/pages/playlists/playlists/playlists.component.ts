import { Component } from '@angular/core';
import { PlaylistsService } from '../playlists.service';
import { Observable } from 'rxjs';
import { PlaylistModel } from '@rustic/http-client';
import { Store } from '@ngrx/store';
import { RmsState, selectProviders } from '../../../store/reducers';
import { map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'rms-playlists',
    templateUrl: './playlists.component.html',
    styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent {

    playlists$: Observable<PlaylistModel[]>;

    constructor(private store: Store<RmsState>, private playlists: PlaylistsService) {
        const providers$ = this.store.select(selectProviders)
            .pipe(
                map(providers => providers
                    .filter(p => p.selected)
                    .map(p => p.provider)
                )
            );
        this.playlists$ = providers$.pipe(switchMap(providers => playlists.getPlaylists(providers)));
    }
}
