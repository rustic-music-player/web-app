import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { PlayerModel, TrackModel } from '@rustic/http-client';
import { ApiClient } from '../contracts/api-client';

export interface PlayerState {
    playing: boolean;
    volume: number;
    current?: TrackModel;
}

@Injectable()
export class PlayerService {
    constructor(private client: ApiClient) {
    }

    play(id: string): Observable<void> {
        return from(this.client.playerControlPlay(id));
    }

    pause(id: string): Observable<void> {
        return from(this.client.playerControlPause(id));
    }

    next(id: string): Observable<void> {
        return from(this.client.playerControlNext(id));
    }

    prev(id: string): Observable<void> {
        return from(this.client.playerControlPrev(id));
    }

    getState(): Observable<PlayerState> {
        return from(this.client.getPlayer(null));
    }

    setVolume(id: string, volume: number): Observable<void> {
        return from(this.client.playerSetVolume(id, volume));
    }

    getPlayers(): Observable<PlayerModel[]> {
        return from(this.client.getPlayers());
    }
}
