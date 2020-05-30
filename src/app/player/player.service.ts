import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { TrackModel } from '@rustic/http-client';
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

    play(): Observable<void> {
        return from(this.client.playerControlPlay(null));
    }

    pause(): Observable<void> {
        return from(this.client.playerControlPause(null));
    }

    next(): Observable<void> {
        return from(this.client.playerControlNext(null));
    }

    prev(): Observable<void> {
        return from(this.client.playerControlPrev(null));
    }

    getState(): Observable<PlayerState> {
        return from(this.client.getPlayer(null));
    }

    setVolume(volume: number): Observable<void> {
        return from(this.client.playerSetVolume(null, volume));
    }
}
