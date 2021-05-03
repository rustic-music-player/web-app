import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExtensionsComponent } from './extensions/extensions.component';
import { SharedModule } from '../../shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { QrCodeDirective } from './qr-code.directive';

@NgModule({
    declarations: [ExtensionsComponent, QrCodeDirective],
  imports: [
    CommonModule,
    RouterModule.forChild(ExtensionsModule.routes),
    SharedModule,
    MatExpansionModule,
  ],
})
export class ExtensionsModule {
    private static routes: Routes = [
        {
            path: 'extensions',
            component: ExtensionsComponent,
        },
    ];
}
