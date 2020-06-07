import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AlbumModel } from '@rustic/http-client';
import { RmsState, selectAllAlbums } from '../../../store/reducers';
import { select, Store } from '@ngrx/store';
import { FetchAlbums } from '../../../store/actions/album.actions';

@Component({
    selector: 'rms-library-albums',
    templateUrl: './albums.component.html',
    styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
    albums$: Observable<AlbumModel[]>;

    constructor(private store: Store<RmsState>) {
        this.albums$ = this.store.pipe(select(selectAllAlbums));
    }

    ngOnInit() {
        this.store.dispatch(new FetchAlbums());
    }
}
