import { Track } from './track.model';
import { Artist } from './artist.model';

export interface Album {
    cursor: string;
    title: string;
    artist?: Artist;
    tracks: Track[];
    provider?: any;
    coverart?: string;
}