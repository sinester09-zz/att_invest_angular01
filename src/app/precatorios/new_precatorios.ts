import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { AppConfigService } from '../core/services/config.service';
import { AppSplashScreenService } from '../core/services/splash-screen.service';
import { appAnimations } from '../core/animations';
import { AlertService,BasicUserService, StorageService,AuthService } from '../services/index';


@Component({
  selector: 'precatorio',
  templateUrl: './Precatorios.component.html',
  providers: [BasicUserService]
})
export class BasicComponent implements OnInit {
  basicFormErrors: any;
  basicForm: FormGroup;
  languages: any;
  selectedLanguage: any;

  constructor(
      private router: Router,
      private translate: TranslateService,
      private appConfig: AppConfigService,
      private formBuilder: FormBuilder,
      private basicservice: BasicUserService,
      private alertService: AlertService,
      private appStorage: StorageService,
      private snackBar: MatSnackBar,
      private appSplashScreen: AppSplashScreenService,
      private auth: AuthService,
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

  
      this.basicFormErrors = {
          username       : {},
          email          : {},
          language       : {}
      };
  }


  ngOnInit() {

    this.basicForm = this.formBuilder.group({
      username       : ['', Validators.required],
      email          : ['', [Validators.required, Validators.email]],
      language       : ['', Validators.required],
      llave:this.auth.storage.getCurrentUser()['email']
      
  });
  
  }


  setLanguage(lang)
  {
      // Use the selected language for translations
      this.translate.use(lang);
  }



 basicUser() {
    this.appSplashScreen.show();
    console.log('Register payload: ', this.basicForm.value);

    this.basicservice.createBasicUser(this.basicForm.value)
        .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this.setLanguage(this.basicForm.value.language);
                this.appSplashScreen.hide();
                this.router.navigate(['/home']);
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
}
