import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DurationPipe } from './duration.pipe';
import { ProviderPipe } from './provider.pipe';
import { RouterModule } from '@angular/router';
import { QueueTrackDirective } from './queue-track.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatMenuModule,
        FlexLayoutModule,
        HttpClientModule,
        ReactiveFormsModule,
        DurationPipe,
        ProviderPipe,
        RouterModule,
        QueueTrackDirective
    ],
    declarations: [
        DurationPipe,
        ProviderPipe,
        QueueTrackDirective
    ]
})
export class SharedModule {
}
