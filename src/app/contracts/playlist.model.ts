import { Track } from './track.model';

export interface Playlist {
    cursor: string;
    title: string;
    tracks: Track[];
}