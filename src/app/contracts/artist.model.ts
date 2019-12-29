import { Track } from './track.model';
import { Album } from './album.model';

export interface Artist {
    cursor: string;
    name: string;
    albums?: Album[];
    tracks?: Track[];
    image?: string;
}