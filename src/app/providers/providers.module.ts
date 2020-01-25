import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ProvidersComponent } from './providers/providers.component';

@NgModule({
    declarations: [ProvidersComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(ProvidersModule.routes)
    ]
})
export class ProvidersModule {
    private static readonly routes: Routes = [{
        path: 'providers',
        component: ProvidersComponent
    }];
}
