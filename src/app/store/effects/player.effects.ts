import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Messages, SocketService } from '../../socket.service';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import {
    ChangePlayerVolume,
    PlayerActionTypes,
    PlayerCurrentTrackUpdated,
    PlayerStateUpdated,
    PlayerVolumeUpdated
} from '../actions/player.actions';
import { PlayerService } from '../../player/player.service';

@Injectable()
export class PlayerEffects {
    @Effect({ dispatch: false }) play$ = this.actions$.pipe(
        ofType(PlayerActionTypes.Play),
        switchMap(() => this.playerApi.play())
    );

    @Effect({ dispatch: false }) pause$ = this.actions$.pipe(
        ofType(PlayerActionTypes.Pause),
        switchMap(() => this.playerApi.pause())
    );

    @Effect({ dispatch: false }) next$ = this.actions$.pipe(
        ofType(PlayerActionTypes.Next),
        switchMap(() => this.playerApi.next())
    );

    @Effect({ dispatch: false }) prev$ = this.actions$.pipe(
        ofType(PlayerActionTypes.Prev),
        switchMap(() => this.playerApi.prev())
    );

    @Effect({ dispatch: false }) changeVolume$ = this.actions$.pipe(
        ofType(PlayerActionTypes.ChangeVolume),
        switchMap((action: ChangePlayerVolume) => this.playerApi.setVolume(action.payload))
    );

    @Effect() playerState$ = this.socket.ws$.pipe(
        filter(({ type }) => type === Messages.PlayerStateChanged),
        map(({ payload }) => payload),
        map(payload => new PlayerStateUpdated(payload))
    );

    @Effect() currentTrack$ = this.socket.ws$.pipe(
        filter(({ type }) => type === Messages.CurrentlyPlayingChanged),
        map(({ payload }) => payload),
        map(payload => new PlayerCurrentTrackUpdated(payload))
    );

    @Effect() initialState$ = this.playerApi.getState().pipe(
        switchMap(({ playing, current, volume }) => [
            new PlayerStateUpdated(playing),
            new PlayerCurrentTrackUpdated(current),
            new PlayerVolumeUpdated(volume)
        ])
    );

    constructor(private actions$: Actions,
                private socket: SocketService,
                private playerApi: PlayerService) {
    }
}
