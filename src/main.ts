import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { ApiClient } from './app/contracts/api-client';

if (localStorage.darkTheme && JSON.parse(localStorage.darkTheme)) {
    document.querySelector('body').classList.add('dark-theme');
}

if (environment.production) {
    enableProdMode();
}
import('@rustic/http-client')
    .then((client) => {
        platformBrowserDynamic([
            {
                provide: ApiClient,
                useValue: client,
            },
        ]).bootstrapModule(AppModule);
    })
    .catch((err) => console.error(err));
