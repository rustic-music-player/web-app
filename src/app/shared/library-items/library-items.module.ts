import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumCardComponent } from './album-card/album-card.component';
import { SharedModule } from '../shared.module';
import { AlbumCoverComponent } from './album-cover/album-cover.component';
import { ArtistCardComponent } from './artist-card/artist-card.component';
import { TrackListItemComponent } from './track-list-item/track-list-item.component';
import { PlaylistCardComponent } from './playlist-card/playlist-card.component';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [
        AlbumCardComponent,
        AlbumCoverComponent,
        ArtistCardComponent,
        TrackListItemComponent,
        PlaylistCardComponent,
    ],
    exports: [
        AlbumCardComponent,
        AlbumCoverComponent,
        ArtistCardComponent,
        TrackListItemComponent,
        PlaylistCardComponent,
    ],
})
export class LibraryItemsModule {}
