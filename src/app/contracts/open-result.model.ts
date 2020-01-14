export interface OpenResult {
    type: 'track' | 'artist' | 'album' | 'playlist';
    cursor: string;
}