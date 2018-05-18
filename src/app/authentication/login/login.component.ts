import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

import { AppConfigService } from '../../core/services/config.service';
import { appAnimations } from '../../core/animations';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { StorageService, AuthService } from '../../services/index';

@Component({
    selector    : 'login',
    templateUrl : './login.component.html',
    styleUrls   : ['./login.component.scss'],
    animations : appAnimations
})
export class LoginComponent implements OnInit 
{
    loginForm: FormGroup;
    loginFormErrors: any;
    loading = false;
    returnUrl: string;

    creds : CredenciaisDTO = {
        email: "",
        password: ""
    };

    constructor(
        private translate: TranslateService,
        private appConfig: AppConfigService,
        private formBuilder: FormBuilder,
        private appStorage: StorageService,
        private auth: AuthService,
        private router: Router,
        private snackBar: MatSnackBar
    )
    {
        this.appConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.loginFormErrors = {
            email   : {},
            password: {}
        };
    }

    ngOnInit()
    {
        let lang = this.appStorage.getTemporaryInLocal('lang');
        // Use a language
        if(lang) {
            this.translate.use(lang);
        } else {
            this.translate.use('br');
        }

        this.loginForm = this.formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }

    onLoginFormValuesChanged() {
        for ( const field in this.loginFormErrors ) {
            if ( !this.loginFormErrors.hasOwnProperty(field) ) {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if ( control && control.dirty && !control.valid ) {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }

    login() {
        console.log('Teste login : ', this.creds);
        this.auth.authenticate(this.creds).subscribe(response => {
            this.auth.successfulLogin(response.headers.get('Authorization'));
            this.appStorage.removeTemporaryInLocal('lang');
            this.appStorage.removeTemporaryInLocal('email');
            this.router.navigate(['/home']);
        },
        error => {
            console.info('Error login: ', error);
            this.snackBar.open(error.error, "Fechar", {
                duration: 15000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
            });
        });    
    }
}
