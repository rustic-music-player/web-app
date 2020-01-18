import { Track } from './track.model';
import { Artist } from './artist.model';

export interface ExploreModel {
    folders: string[];
    items: {
        label: string;
        data: {
            track: Track;
            artist: Artist;
        }
    }[];
}