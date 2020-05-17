import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { PlayerModule } from './player/player.module';
import { LibraryModule } from './pages/library/library.module';
import { QueueService } from './queue.service';
import { PlaylistsModule } from './pages/playlists/playlists.module';
import { SearchModule } from './search/search.module';
import { MatIconRegistry } from '@angular/material/icon';
import { SocketService } from './socket.service';
import { reducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { PlayerEffects } from './store/effects/player.effects';
import { AlbumEffects } from './store/effects/album.effects';
import { ArtistEffects } from './store/effects/artist.effects';
import { TrackEffects } from './store/effects/track.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from './store/reducers/router.reducer';
import { ExtensionsModule } from './pages/extensions/extensions.module';
import { ProviderEffects } from './store/effects/provider.effects';
import { ExploreModule } from './explore/explore.module';
import { ProvidersModule } from './providers/providers.module';
import { PlayerPageModule } from './pages/player-page/player-page.module';

@NgModule({
    declarations: [
        AppComponent,
        SidenavComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        SharedModule,
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument(),
        StoreRouterConnectingModule.forRoot({ serializer: CustomRouterStateSerializer,
            stateKey: 'router'
        }),
        EffectsModule.forRoot([
            PlayerEffects,
            AlbumEffects,
            ArtistEffects,
            TrackEffects,
            ProviderEffects
        ]),
        PlayerModule,
        LibraryModule,
        PlaylistsModule,
        SearchModule,
        ExtensionsModule,
        ExploreModule,
        ProvidersModule,
        PlayerPageModule
    ],
    providers: [
        QueueService,
        SocketService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('../assets/mdi.svg'));
    }
}
