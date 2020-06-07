import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as player from './player.reducer';
import * as library from './library.reducer';
import * as albums from './album.reducer';
import * as artists from './artist.reducer';
import * as tracks from './track.reducer';
import * as router from './router.reducer';
import * as provider from './provider.reducer';

export interface RmsState {
    player: player.State;
    library: library.State;
    router: router.State;
    providers: provider.State;
}

export const reducers: ActionReducerMap<RmsState> = {
    player: player.reducer,
    library: library.reducer,
    router: router.reducer,
    providers: provider.reducer,
};

export function selectPlayerState(state: RmsState): player.State {
    return state.player;
}

export function selectLibraryAlbumsState(state: RmsState): albums.State {
    return state.library.albums;
}

export function selectLibraryArtistsState(state: RmsState): artists.State {
    return state.library.artists;
}

export function selectLibraryTracksState(state: RmsState): tracks.State {
    return state.library.tracks;
}

export function selectProvidersState(state: RmsState): provider.State {
    return state.providers;
}

export const selectCurrentTrack = createSelector(
    selectPlayerState,
    player.selectCurrentTrack
);

export const selectPlayingState = createSelector(
    selectPlayerState,
    player.selectPlayingState
);

export const selectVolume = createSelector(
    selectPlayerState,
    player.selectVolume
);

export const selectAllAlbums = createSelector(
    selectLibraryAlbumsState,
    albums.selectAllAlbums
);

export const selectAlbumEntities = createSelector(
    selectLibraryAlbumsState,
    albums.selectAlbumEntities
);

export const selectCurrentAlbumId = createSelector(
    selectLibraryAlbumsState,
    albums.getSelectedAlbumCursor
);

export const selectCurrentAlbum = createSelector(
    selectAlbumEntities,
    selectCurrentAlbumId,
    (entities, id) => entities[id]
);

export const selectAllArtists = createSelector(
    selectLibraryArtistsState,
    artists.selectAllArtists
);

export const selectArtistEntities = createSelector(
    selectLibraryArtistsState,
    artists.selectArtistEntities
);

export const selectCurrentArtistId = createSelector(
    selectLibraryArtistsState,
    artists.getSelectedArtistCursor
);

export const selectCurrentArtist = createSelector(
    selectArtistEntities,
    selectCurrentArtistId,
    (entities, id) => entities[id]
);

export const selectAllTracks = createSelector(
    selectLibraryTracksState,
    tracks.selectAllTracks
);

export const selectProviders = createSelector(
    selectProvidersState,
    provider.selectProviders
);
