import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../search/search.service';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
    selector: 'rms-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.scss'
    ]
})
export class HeaderComponent {

    darkTheme = localStorage.darkTheme ? JSON.parse(localStorage.darkTheme) : false;

    searchControl = new FormControl();

    @Output('toggle-sidenav')
    toggleSidenav = new EventEmitter<void>();

    constructor(private search: SearchService,
                private router: Router) {
        this.searchControl
            .valueChanges
            .pipe(tap(query => this.router.navigateByUrl(`/search?query=${query}`)))
            .pipe(debounceTime(500))
            .subscribe(value => this.search.query(value));
        this.search
            .query$
            .subscribe(query => this.searchControl.setValue(query, {
                emitEvent: false
            }));
    }

    onToggleSidenav() {
        this.toggleSidenav.emit();
    }

    onToggleDarkTheme() {
        this.darkTheme = !this.darkTheme;
        localStorage.darkTheme = this.darkTheme;
        if (this.darkTheme) {
            document.body.classList.add('dark-theme');
        }else {
            document.body.classList.remove('dark-theme');
        }
    }
}
