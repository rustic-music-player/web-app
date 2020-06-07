import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ProvidersComponent } from './providers/providers.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProviderPasswordAuthenticationComponent } from './providers/provider-password-authentication/provider-password-authentication.component';

@NgModule({
    declarations: [ProvidersComponent, ProviderPasswordAuthenticationComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(ProvidersModule.routes),
        MatFormFieldModule,
        MatInputModule,
    ],
})
export class ProvidersModule {
    private static readonly routes: Routes = [
        {
            path: 'providers',
            component: ProvidersComponent,
        },
    ];
}
