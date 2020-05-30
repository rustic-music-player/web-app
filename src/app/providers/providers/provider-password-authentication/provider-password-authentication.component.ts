import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvailableProviderModel } from '@rustic/http-client';

export interface ProviderPasswordLogin {
    username: string;
    password: string;
}

@Component({
    selector: 'rms-provider-password-authentication',
    templateUrl: './provider-password-authentication.component.html',
    styleUrls: ['./provider-password-authentication.component.scss']
})
export class ProviderPasswordAuthenticationComponent {
    form: FormGroup;

    @Input()
    provider: AvailableProviderModel;

    @Output()
    login = new EventEmitter<ProviderPasswordLogin>();

    constructor(formBuilder: FormBuilder) {
        this.form = formBuilder.group({
            username: [null, Validators.required],
            password: [null, Validators.required]
        });
    }

    onSubmit() {
        this.login.emit(this.form.value);
    }
}
