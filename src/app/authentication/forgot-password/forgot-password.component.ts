import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { AppConfigService } from '../../core/services/config.service';
import { appAnimations } from '../../core/animations';
import { StorageService } from '../../services/index';

@Component({
    selector   : 'forgot',
    templateUrl: './forgot-password.component.html',
    styleUrls  : ['./forgot-password.component.scss'],
    animations : appAnimations
})
export class ForgotPasswordComponent implements OnInit
{
    forgotPasswordForm: FormGroup;
    forgotPasswordFormErrors: any;

    constructor(
        private translate: TranslateService,
        private appConfig: AppConfigService,
        private formBuilder: FormBuilder,
        private appStorage: StorageService
    )
    {
        this.appConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.forgotPasswordFormErrors = {
            email: {}
        };
    }

    ngOnInit()
    {
        this.forgotPasswordForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });

        this.forgotPasswordForm.valueChanges.subscribe(() => {
            this.onForgotPasswordFormValuesChanged();
        });

        let lang = this.appStorage.getTemporaryInLocal('lang');
        // Use a language
        if(lang) {
            this.translate.use(lang);
        } else {
            this.translate.use('br');
        }
    }

    onForgotPasswordFormValuesChanged()
    {
        for ( const field in this.forgotPasswordFormErrors )
        {
            if ( !this.forgotPasswordFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.forgotPasswordFormErrors[field] = {};

            // Get the control
            const control = this.forgotPasswordForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.forgotPasswordFormErrors[field] = control.errors;
            }
        }
    }
}
