import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaObserver } from '@angular/flex-layout';
import { FlexibleConnectedPositionStrategy, Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { PlayerModel, TrackModel } from '@rustic/http-client';
import {RmsState, selectCurrentTrack, selectPlayingState, selectVolume} from '../store/reducers';
import { select, Store } from '@ngrx/store';
import {
    ChangePlayerVolume,
    PlayerNext,
    PlayerPause,
    PlayerPlay,
    PlayerPrev,
    SelectPlayer
} from '../store/actions/player.actions';
import { QueueService } from '../queue.service';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { MatSliderChange } from '@angular/material/slider';

@Component({
    selector: 'rms-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

    private overlayRef: OverlayRef;
    private playerOverlayRef: OverlayRef;
    private positionStrategy: FlexibleConnectedPositionStrategy;
    private playerPositionStrategy: FlexibleConnectedPositionStrategy;

    @ViewChild('queueOverlay')
    queueOverlay;

    @ViewChild('playerOverlay', { static: false })
    playerOverlay;

    @ViewChild('queueToggle', { read: ElementRef })
    queueToggle: ElementRef;

    @ViewChild('playerToggle', { read: ElementRef, static: false })
    playerToggle: ElementRef;

    showQueue = false;
    showPlayer = false;

    playing = false;
    current$: Observable<TrackModel | null>;
    volume$: Observable<number>;
    queueIsEmpty$: Observable<boolean>;

    players$: Observable<PlayerModel[]>;
    currentPlayer$: Observable<string>;

    constructor(private media: MediaObserver,
                private overlay: Overlay,
                private positionBuilder: OverlayPositionBuilder,
                private store: Store<RmsState>,
                private queueService: QueueService) {
        this.current$ = this.store.pipe(select(selectCurrentTrack));
        this.store
            .pipe(select(selectPlayingState))
            .subscribe(playing => {
                this.playing = playing
            });
        this.volume$ = this.store.pipe(select(selectVolume));
        this.currentPlayer$ = this.store.pipe(select(s => s.player.currentPlayer));
        this.queueIsEmpty$ = this.currentPlayer$.pipe(
            switchMap(player => queueService.observe(player)),
            map(queue => queue.length === 0),
            shareReplay(1)
        );
        this.players$ = this.store.pipe(select(s => s.player.players));
    }

    ngOnInit() {
        this.media
            .media$
            .subscribe(change => {
                if (change.mqAlias === 'xs') {
                    this.closeQueue();
                }
            });
    }

    toggle($event: MouseEvent) {
        $event.preventDefault();
        $event.stopPropagation();
        if (this.playing) {
            this.store.dispatch(new PlayerPause());
        }else {
            this.store.dispatch(new PlayerPlay());
        }
    }

    next($event: MouseEvent) {
        $event.preventDefault();
        $event.stopPropagation();
        this.store.dispatch(new PlayerNext());
    }

    prev($event: MouseEvent) {
        $event.preventDefault();
        $event.stopPropagation();
        this.store.dispatch(new PlayerPrev());
    }

    onUpdateVolume(event: MatSliderChange) {
        this.store.dispatch(new ChangePlayerVolume(event.value))
    }

    toggleQueue() {
        if (this.media.isActive('gt-sm')) {
            if (!this.overlayRef) {
                this.setupOverlayRef();
            }
            if (this.showQueue) {
                this.overlayRef.detach();
            }else {
                this.overlayRef.attach(this.queueOverlay);
            }
        }
        this.showQueue = !this.showQueue;
    }

    private closeQueue() {
        if (this.overlayRef &&
            this.overlayRef.hasAttached() &&
            this.showQueue) {
            this.overlayRef.detach();
            this.showQueue = false;
        }
    }

    private setupOverlayRef() {
        this.positionStrategy = this.positionBuilder
            .flexibleConnectedTo(this.queueToggle)
            .withPositions([
                {
                    offsetX: 0,
                    offsetY: -32,
                    originX: 'end',
                    originY: 'top',
                    weight: 1,
                    overlayX: 'end',
                    overlayY: 'bottom'
                }
            ]);
        this.overlayRef = this.overlay.create({
            height: 500,
            width: 400,
            positionStrategy: this.positionStrategy
        });
    }

    togglePlayer() {
        if (this.media.isActive('gt-sm')) {
            if (!this.playerOverlayRef) {
                this.setupPlayerOverlayRef();
            }
            if (this.showPlayer) {
                this.playerOverlayRef.detach();
            }else {
                this.playerOverlayRef.attach(this.playerOverlay);
            }
        }
        this.showPlayer = !this.showPlayer;
    }

    private closePlayer() {
        if (this.playerOverlayRef &&
            this.playerOverlayRef.hasAttached() &&
            this.showPlayer) {
            this.playerOverlayRef.detach();
            this.showPlayer = false;
        }
    }

    private setupPlayerOverlayRef() {
        this.playerPositionStrategy = this.positionBuilder
            .flexibleConnectedTo(this.playerToggle)
            .withPositions([
                {
                    offsetX: 0,
                    offsetY: -32,
                    originX: 'end',
                    originY: 'top',
                    weight: 1,
                    overlayX: 'end',
                    overlayY: 'bottom'
                }
            ]);
        this.playerOverlayRef = this.overlay.create({
            height: 500,
            width: 400,
            positionStrategy: this.playerPositionStrategy
        });
    }

    selectPlayer(player: PlayerModel) {
        this.store.dispatch(new SelectPlayer(player));
    }
}
