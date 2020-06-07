import { Component, Input, HostBinding } from '@angular/core';
import { AlbumModel } from '@rustic/http-client';

@Component({
    selector: 'rms-album-cover',
    templateUrl: './album-cover.component.html',
    styleUrls: ['./album-cover.component.scss'],
})
export class AlbumCoverComponent {
    @Input()
    album: AlbumModel;

    @HostBinding('title')
    get title() {
        return this.album.title;
    }
}
