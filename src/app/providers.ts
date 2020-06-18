export interface ProviderStyle {
    label: string;
    icon: string;
}

export const PROVIDERS: { [provider: string]: ProviderStyle } = {
    internal: {
        label: 'Rustic',
        icon: 'archive',
    },
    soundcloud: {
        label: 'Soundcloud',
        icon: 'soundcloud',
    },
    spotify: {
        label: 'Spotify',
        icon: 'spotify',
    },
    pocketcasts: {
        label: 'Pocketcasts',
        icon: 'podcast',
    },
    gmusic: {
        label: 'Google Play Music',
        icon: 'google-play',
    },
    plex: {
        label: 'Plex',
        icon: 'plex',
    },
    local: {
        label: 'Local',
        icon: 'folder-multiple',
    },
    youtube: {
        label: 'YouTube',
        icon: 'youtube',
    },
};
