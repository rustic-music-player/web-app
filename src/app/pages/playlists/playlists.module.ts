import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsComponent } from './playlists/playlists.component';
import { PlaylistsService } from './playlists.service';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PlaylistComponent } from './playlist/playlist.component';
import { LibraryItemsModule } from '../../shared/library-items/library-items.module';
import { AddPlaylistDialogComponent } from './add-playlist-dialog/add-playlist-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

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
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
    ],
    declarations: [
        PlaylistsComponent,
        PlaylistComponent,
        AddPlaylistDialogComponent,
    ],
})
export class PlaylistsModule {}
