import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExtensionsComponent } from './extensions/extensions.component';
import { SharedModule } from '../shared/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
    declarations: [ExtensionsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(ExtensionsModule.routes),
        SharedModule,
        MatSlideToggleModule
    ]
})
export class ExtensionsModule {
    private static routes: Routes = [{
        path: 'extensions',
        component: ExtensionsComponent
    }];
}
