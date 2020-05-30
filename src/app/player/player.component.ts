import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaObserver } from '@angular/flex-layout';
import { FlexibleConnectedPositionStrategy, Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { TrackModel } from '@rustic/http-client';
import {RmsState, selectCurrentTrack, selectPlayingState, selectVolume} from '../store/reducers';
import { select, Store } from '@ngrx/store';
import { ChangePlayerVolume, PlayerNext, PlayerPause, PlayerPlay, PlayerPrev } from '../store/actions/player.actions';
import { QueueService } from '../queue.service';
import { map, shareReplay } from 'rxjs/operators';
import { MatSliderChange } from '@angular/material/slider';

@Component({
    selector: 'rms-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

    private overlayRef: OverlayRef;
    private positionStrategy: FlexibleConnectedPositionStrategy;

    @ViewChild('queueOverlay')
    queueOverlay;

    @ViewChild('queueToggle', { read: ElementRef })
    queueToggle: ElementRef;

    showQueue = false;

    playing = false;
    current$: Observable<TrackModel | null>;
    volume$: Observable<number>;
    queueIsEmpty$: Observable<boolean>;

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
        this.queueIsEmpty$ = queueService.observe()
            .pipe(map(queue => queue.length === 0), shareReplay(1));
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
}
