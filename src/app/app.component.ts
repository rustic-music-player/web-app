import { Component, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'rms-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    @ViewChild('sidenav')
    sidenav: MatSidenav;

    sidebarMode$: Observable<string>;

    constructor(private media: MediaObserver) {
        this.sidebarMode$ = this.media.asObservable().pipe(
            map(() => {
                let isWide = this.media.isActive('gt-sm');
                if (isWide) {
                    this.sidenav.open();
                } else {
                    this.sidenav.close();
                }
                return isWide ? 'side' : 'over';
            })
        );
    }
}
