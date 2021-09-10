import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsComponent } from './playlists/playlists.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PlaylistComponent } from './playlist/playlist.component';
import { LibraryItemsModule } from '../../shared/library-items/library-items.module';
import { AddPlaylistDialogComponent } from './add-playlist-dialog/add-playlist-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
    {
        path: 'playlists',
        component: PlaylistsComponent,
    },
    {
        path: 'playlists/:playlist_cursor',
        component: PlaylistComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        LibraryItemsModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatTooltipModule
    ],
    declarations: [
        PlaylistsComponent,
        PlaylistComponent,
        AddPlaylistDialogComponent,
    ],
})
export class PlaylistsModule {}
