import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, defer, Observable, of } from 'rxjs';
import {
    ProviderFolderModel,
    ProviderModel,
    TrackModel,
} from '@rustic/http-client';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { ProviderService } from '../../provider.service';
import { ActivatedRoute } from '@angular/router';
import { RmsState, selectProviders } from '../../store/reducers';
import { Store } from '@ngrx/store';

@Component({
    selector: 'rms-explore-provider',
    templateUrl: './explore-provider.component.html',
    styleUrls: ['./explore-provider.component.scss'],
})
export class ExploreProviderComponent implements OnInit {
    private layer$ = defer(() => this.getCurrentLayer()).pipe(shareReplay(1));

    path$ = new BehaviorSubject<string[]>([]);
    provider$ = defer(() => this.getProvider());
    folders$: Observable<string[]> = defer(() => this.selectFolders());
    tracks$: Observable<TrackModel[]> = defer(() => this.selectTracks());

    get path(): string[] {
        return this.path$.value;
    }

    constructor(
        private activatedRoute: ActivatedRoute,
        private store: Store<RmsState>,
        private providerService: ProviderService
    ) {}

    ngOnInit() {
        this.activatedRoute.queryParams
            .pipe(
                map((params) => params.path),
                filter((path) => path != null),
                map((path: string) =>
                    path.split('/').filter((p) => p.trim().length > 0)
                )
            )
            .subscribe((path) => this.path$.next(path));
    }

    selectFolder(folder: string) {
        this.path$.next([...this.path, folder]);
    }

    next(folder: string): string {
        return [...this.path, folder].join('/');
    }

    private getProvider(): Observable<ProviderModel> {
        return this.activatedRoute.params.pipe(
            map((params) => params.provider),
            switchMap((provider) =>
                this.store
                    .select(selectProviders)
                    .pipe(
                        map((providers) =>
                            providers.find((p) => p.provider === provider)
                        )
                    )
            )
        );
    }

    private getCurrentLayer(): Observable<ProviderFolderModel> {
        return combineLatest([this.path$, this.provider$]).pipe(
            filter(([path, provider]) => provider != null),
            switchMap(([path, provider]) => {
                if (path.length === 0) {
                    return of(provider.explore);
                }
                return this.providerService.navigate(
                    provider.provider,
                    path.join('/')
                );
            })
        );
    }

    private selectFolders(): Observable<string[]> {
        return this.layer$.pipe(map((layer) => layer.folders));
    }

    private selectTracks(): Observable<TrackModel[]> {
        return this.layer$.pipe(
            map((layer) =>
                layer.items
                    .map((item) => {
                        if ('track' in item.data) {
                            return item.data.track;
                        }
                        return null;
                    })
                    .filter((track) => track)
            )
        );
    }
}
