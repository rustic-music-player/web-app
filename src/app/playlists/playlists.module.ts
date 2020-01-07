import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsComponent } from './playlists/playlists.component';
import { PlaylistsService } from './playlists.service';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PlaylistComponent } from './playlist/playlist.component';
import { LibraryItemsModule } from '../shared/library-items/library-items.module';

const routes: Routes = [
    {
        path: 'playlists',
        component: PlaylistsComponent
    },
    {
        path: 'playlists/:playlist_cursor',
        component: PlaylistComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        LibraryItemsModule
    ],
    declarations: [
        PlaylistsComponent,
        PlaylistComponent
    ],
    providers: [
        PlaylistsService
    ]
})
export class PlaylistsModule {
}
