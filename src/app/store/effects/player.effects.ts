import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Messages, SocketService } from '../../socket.service';
import { filter, map, switchMap, tap, first } from 'rxjs/operators';
import {
    ChangePlayerVolume,
    PlayerActionTypes,
    PlayerCurrentTrackUpdated,
    PlayerStateUpdated,
    PlayerVolumeUpdated,
    FetchPlayers,
} from '../actions/player.actions';
import { PlayerService } from '../../player/player.service';
import { RmsState } from '../reducers';
import { select, Store } from '@ngrx/store';

@Injectable()
export class PlayerEffects {
    @Effect({ dispatch: false }) play$ = this.actions$.pipe(
        ofType(PlayerActionTypes.Play),
        switchMap(() => this.getPlayerId()),
        switchMap((id) => this.playerApi.play(id))
    );

    @Effect({ dispatch: false }) pause$ = this.actions$.pipe(
        ofType(PlayerActionTypes.Pause),
        switchMap(() => this.getPlayerId()),
        switchMap((id) => this.playerApi.pause(id))
    );

    @Effect({ dispatch: false }) next$ = this.actions$.pipe(
        ofType(PlayerActionTypes.Next),
        switchMap(() => this.getPlayerId()),
        switchMap((id) => this.playerApi.next(id))
    );

    @Effect({ dispatch: false }) prev$ = this.actions$.pipe(
        ofType(PlayerActionTypes.Prev),
        switchMap(() => this.getPlayerId()),
        switchMap((id) => this.playerApi.prev(id))
    );

    @Effect({ dispatch: false }) changeVolume$ = this.actions$.pipe(
        ofType(PlayerActionTypes.ChangeVolume),
        switchMap((action: ChangePlayerVolume) =>
            this.getPlayerId().pipe(
                map((id) => ({ id, volume: action.payload }))
            )
        ),
        switchMap(({ id, volume }) => this.playerApi.setVolume(id, volume))
    );

    @Effect() playerState$ = this.socket.ws$.pipe(
        filter(({ type }) => type === Messages.PlayerStateChanged),
        map(
            ({ payload, player_cursor }) =>
                new PlayerStateUpdated(player_cursor, payload)
        )
    );

    @Effect() currentTrack$ = this.socket.ws$.pipe(
        filter(({ type }) => type === Messages.CurrentlyPlayingChanged),
        map(
            ({ payload, player_cursor }) =>
                new PlayerCurrentTrackUpdated(player_cursor, payload)
        )
    );

    @Effect()
    fetchPlayers = this.playerApi
        .getPlayers()
        .pipe(map((players) => new FetchPlayers(players)));

    constructor(
        private actions$: Actions,
        private socket: SocketService,
        private playerApi: PlayerService,
        private store: Store<RmsState>
    ) {}

    private getPlayerId = () =>
        this.store.pipe(
            select((s) => s.player.currentPlayer),
            first()
        );
}
