import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { AppConfigService } from '../../core/services/config.service';
import { AppSplashScreenService } from '../../core/services/splash-screen.service';
import { appAnimations } from '../../core/animations';
import { AlertService, UserService, StorageService } from '../../services/index';

@Component({
    selector   : 'register',
    templateUrl: './register.component.html',
    styleUrls  : ['./register.component.scss'],
    animations : appAnimations
})
export class RegisterComponent implements OnInit
{
    registerForm: FormGroup;
    registerFormErrors: any;
    languages: any;
    selectedLanguage: any;

    constructor(
        private router: Router,
        private translate: TranslateService,
        private appConfig: AppConfigService,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private alertService: AlertService,
        private appStorage: StorageService,
        private snackBar: MatSnackBar,
        private appSplashScreen: AppSplashScreenService
    )
    {
        this.languages = [
            { 'cod': 1, 'id': 'br', 'title': 'Português Brasil', 'flag': 'br' },
            { 'cod': 2, 'id': 'en', 'title': 'English', 'flag': 'us' },
            { 'cod': 3, 'id': 'es', 'title': 'Spanish', 'flag': 'es' }
        ];
        this.selectedLanguage = this.languages[0];

        // Use a language
        this.translate.use('br');

        this.appConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.registerFormErrors = {
            username       : {},
            email          : {},
            password       : {},
            passwordConfirm: {},
            language       : {},
            policy         : {}
        };
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username       : ['', Validators.required],
            email          : ['', [Validators.required, Validators.email]],
            password       : ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPassword]],
            language       : ['', Validators.required],
            policy         : ['', Validators.required]
        });

        this.registerForm.valueChanges.subscribe(() => {
            this.onRegisterFormValuesChanged();
        });
    }

    onRegisterFormValuesChanged() {
        for ( const field in this.registerFormErrors )
        {
            if ( !this.registerFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.registerFormErrors[field] = {};

            // Get the control
            const control = this.registerForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.registerFormErrors[field] = control.errors;
            }
        }
    }

    registerUser() {
        this.appSplashScreen.show();
        console.log('Register payload: ', this.registerForm.value);
        this.userService.createNewUser(this.registerForm.value)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.setLanguage(this.registerForm.value.language);
                    this.appStorage.setTemporaryInLocal("email", this.registerForm.value.email);
                    this.appStorage.setTemporaryInLocal("lang", this.registerForm.value.language);
                    this.appSplashScreen.hide();
                    this.router.navigate(['/mail-confirm']);
                },
                error => {
                    this.appSplashScreen.hide();
                    this.alertService.error(error);
                    this.snackBar.open("Erro ao tentar criar usuário. Tente novamente!", "Fechar", {
                        duration: 15000,
                        horizontalPosition: 'center',
                        verticalPosition: 'top',
                    });
                }
        );
    }

    setLanguage(lang)
    {
        // Use the selected language for translations
        this.translate.use(lang);
    }
}

function confirmPassword(control: AbstractControl)
{
    if ( !control.parent || !control )
    {
        return;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return;
    }

    if ( passwordConfirm.value === '' )
    {
        return;
    }

    if ( password.value !== passwordConfirm.value )
    {
        return {
            passwordsNotMatch: true
        };
    }
}
