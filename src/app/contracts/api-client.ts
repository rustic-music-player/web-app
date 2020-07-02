import {
    AggregatedSearchResults,
    AlbumModel,
    ArtistModel,
    AvailableProviderModel,
    ExtensionModel,
    OpenResultModel,
    PlayerModel,
    PlaylistModel,
    ProviderModel,
    QueuedTrackModel,
    RusticApiClient,
    SearchResults,
    TrackModel,
} from '@rustic/http-client';

export abstract class ApiClient implements RusticApiClient {
    abstract clearQueue(player_id?: string): Promise<void>;

    abstract getAlbum(cursor: string): Promise<AlbumModel>;

    abstract getAlbums(providers: any): Promise<AlbumModel[]>;

    abstract getArtists(): Promise<ArtistModel[]>;

    abstract getArtist(cursor: string): Promise<ArtistModel>;

    abstract getAvailableProviders(): Promise<AvailableProviderModel[]>;

    abstract getExtensions(): Promise<ExtensionModel[]>;

    abstract getPlayer(player_id?: string): Promise<PlayerModel>;

    abstract getPlayers(): Promise<PlayerModel[]>;

    abstract getPlaylist(cursor: string): Promise<PlaylistModel>;

    abstract getPlaylists(providers: any): Promise<PlaylistModel[]>;

    abstract getProviders(): Promise<ProviderModel[]>;

    abstract getQueue(player_id?: string): Promise<QueuedTrackModel[]>;

    abstract getTrack(cursor: string): Promise<TrackModel>;

    abstract getTracks(providers: any): Promise<TrackModel[]>;

    abstract openShareUrl(url: string): Promise<OpenResultModel>;

    abstract playerControlNext(player_id?: string): Promise<void>;

    abstract playerControlPause(player_id?: string): Promise<void>;

    abstract playerControlPlay(player_id?: string): Promise<void>;

    abstract playerControlPrev(player_id?: string): Promise<void>;

    abstract playerSetVolume(
        player_id: string | undefined,
        volume: number
    ): Promise<void>;

    abstract queueAlbum(
        player_id: string | undefined,
        cursor: string
    ): Promise<void>;

    abstract queuePlaylist(
        player_id: string | undefined,
        cursor: string
    ): Promise<void>;

    abstract queueTrack(
        player_id: string | undefined,
        cursor: string
    ): Promise<void>;

    abstract reorderQueueItem(
        player_id: string | undefined,
        before: number,
        after: number
    ): Promise<void>;

    abstract selectQueueItem(
        player_id: string | undefined,
        item: number
    ): Promise<void>;

    abstract removeQueueItem(
        player_id: string | undefined,
        item: number
    ): Promise<void>;

    abstract search(query: string, providers: any): Promise<SearchResults>;

    abstract addAlbumToLibrary(cursor: string): Promise<void>;

    abstract addArtistToLibrary(cursor: string): Promise<void>;

    abstract addPlaylist(name: String): Promise<PlaylistModel>;

    abstract addPlaylistToLibrary(cursor: string): Promise<void>;

    abstract addTrackToLibrary(cursor: string): Promise<void>;

    abstract addTrackToPlaylist(playlist: String, track: String): Promise<void>;

    abstract removePlaylist(cursor: String): Promise<void>;

    abstract removeTrackFromPlaylist(
        playlist: String,
        track: String
    ): Promise<void>;

    abstract aggregatedSearch(
        query: string,
        providers: any
    ): Promise<AggregatedSearchResults>;

    abstract searchLibrary(query: string): Promise<SearchResults>;
}
