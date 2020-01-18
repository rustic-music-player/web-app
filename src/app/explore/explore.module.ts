import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from './explore/explore.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LibraryItemsModule } from '../shared/library-items/library-items.module';
import { ExploreProviderComponent } from './explore-provider/explore-provider.component';

@NgModule({
    declarations: [ExploreComponent, ExploreProviderComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(ExploreModule.routes),
        SharedModule,
        LibraryItemsModule
    ]
})
export class ExploreModule {
    private static routes: Routes = [
        {
            path: 'explore',
            component: ExploreComponent
        },
        {
            path: 'explore/:provider',
            component: ExploreProviderComponent
        }
    ];
}
