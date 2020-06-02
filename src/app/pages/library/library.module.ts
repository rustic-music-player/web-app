import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { LibraryService } from './library.service';
import { LibraryItemsModule } from '../../shared/library-items/library-items.module';
import { AlbumsComponent } from './albums/albums.component';
import { ArtistsComponent } from './artists/artists.component';
import { TracksComponent } from './tracks/tracks.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ArtistComponent } from './artist/artist.component';

const routes: Routes = [
    {
        path: 'library',
        component: LibraryComponent,
        children: [
            {
                path: 'albums',
                component: AlbumsComponent
            },
            {
                path: 'artists',
                component: ArtistsComponent
            },
            {
                path: 'tracks',
                component: TracksComponent
            }
        ]
    },
    {
        path: '',
        redirectTo: '/library/albums',
        pathMatch: 'full'
    },
    {
        path: 'library/albums/:album_cursor',
        component: AlbumComponent
    },
    {
        path: 'library/artists/:artist_cursor',
        component: ArtistComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        LibraryItemsModule,
        ScrollingModule
    ],
    declarations: [
        LibraryComponent,
        AlbumComponent,
        AlbumsComponent,
        ArtistsComponent,
        TracksComponent,
        ArtistComponent
    ],
    exports: [
        LibraryComponent
    ],
    providers: [
        LibraryService
    ]
})
export class LibraryModule {
}
