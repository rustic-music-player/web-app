import { Component, Input } from '@angular/core';
import { TrackModel } from '@rustic/http-client';

@Component({
    selector: 'rms-track-list-item',
    templateUrl: './track-list-item.component.html',
    styleUrls: ['./track-list-item.component.scss']
})
export class TrackListItemComponent {
    @Input()
    track: TrackModel;
}
