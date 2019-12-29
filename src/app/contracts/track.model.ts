import { Album } from './album.model';
import { Artist } from './artist.model';

export interface Track {
    cursor: string;
    title: string;
    artist?: Artist;
    album?: Album;
    provider?: any;
    coverart: string;
    duration?: number;
}