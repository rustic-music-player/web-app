import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlayerPageComponent } from './player-page.component';
import { LibraryItemsModule } from '../../shared/library-items/library-items.module';
import { SharedModule } from '../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    declarations: [PlayerPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(PlayerPageModule.routes),
        LibraryItemsModule,
        SharedModule,
        MatTableModule,
    ],
})
export class PlayerPageModule {
    private static readonly routes: Routes = [
        {
            path: 'player',
            component: PlayerPageComponent,
        },
    ];
}
