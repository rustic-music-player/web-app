import { Component, Input } from '@angular/core';
import { ArtistModel } from '@rustic/http-client';

@Component({
    selector: 'rms-artist-card',
    templateUrl: './artist-card.component.html',
    styleUrls: ['./artist-card.component.scss'],
})
export class ArtistCardComponent {
    @Input()
    artist: ArtistModel;
}
