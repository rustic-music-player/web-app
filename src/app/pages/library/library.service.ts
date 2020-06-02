import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AlbumModel, ArtistModel, TrackModel } from '@rustic/http-client';
import { ApiClient } from '../../contracts/api-client';

@Injectable()
export class LibraryService {
    constructor(private client: ApiClient) {
    }

    getAlbums(): Observable<AlbumModel[]> {
        return from(this.client.getAlbums([]));
    }

    getAlbum(cursor: string): Observable<AlbumModel> {
        return from(this.client.getAlbum(cursor));
    }

    getArtists(): Observable<ArtistModel[]> {
        return from(this.client.getArtists());
    }

    getArtist(cursor: string): Observable<ArtistModel> {
        return from(this.client.getArtist(cursor));
    }

    getTracks(): Observable<TrackModel[]> {
        return from(this.client.getTracks([]));
    }

    getTrack(cursor: string): Observable<TrackModel> {
        return from(this.client.getTrack(cursor));
    }
}
