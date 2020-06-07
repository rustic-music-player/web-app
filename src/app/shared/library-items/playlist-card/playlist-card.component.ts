import { Component, Input } from '@angular/core';
import { PlaylistModel } from '@rustic/http-client';

@Component({
    selector: 'rms-playlist-card',
    templateUrl: './playlist-card.component.html',
    styleUrls: ['./playlist-card.component.scss'],
})
export class PlaylistCardComponent {
    @Input()
    playlist: PlaylistModel;
}
