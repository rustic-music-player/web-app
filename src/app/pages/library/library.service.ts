import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../../contracts/album.model';
import { Artist } from '../../contracts/artist.model';
import { Track } from '../../contracts/track.model';

@Injectable()
export class LibraryService {

    constructor(private http: HttpClient) {
    }

    getAlbums(): Observable<Album[]> {
        return this.http.get<Album[]>('/api/library/albums');
    }

    getAlbum(cursor: string): Observable<Album> {
        return this.http.get<Album>(`/api/library/albums/${cursor}`);
    }

    getArtists(): Observable<Artist[]> {
        return this.http.get<Artist[]>('/api/library/artists');
    }

    getTracks(): Observable<Track[]> {
        return this.http.get<Track[]>('/api/library/tracks');
    }

    getTrack(cursor: string): Observable<Track> {
        return this.http.get<Track>(`/api/tracks/${cursor}`);
    }
}
