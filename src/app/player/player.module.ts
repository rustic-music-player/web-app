import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { SharedModule } from '../shared/shared.module';
import { PlayerService } from './player.service';
import { QueueComponent } from './queue/queue.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        PortalModule,
        OverlayModule,
        DragDropModule
    ],
    declarations: [
        PlayerComponent,
        QueueComponent
    ],
    exports: [
        PlayerComponent
    ],
    providers: [
        PlayerService
    ]
})
export class PlayerModule {
}
