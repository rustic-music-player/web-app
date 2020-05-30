import { Component, Input, HostBinding } from '@angular/core';
import { AlbumModel } from '@rustic/http-client';

@Component({
    selector: 'rms-album-card',
    templateUrl: './album-card.component.html',
    styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent {

    @Input()
    album: AlbumModel;

    @HostBinding('title')
    get title() {
        return this.album.title;
    }
}
