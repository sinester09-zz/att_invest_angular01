import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { AppConfigService } from '../core/services/config.service';
import { AppSplashScreenService } from '../core/services/splash-screen.service';
import { appAnimations } from '../core/animations';
import { AlertService, StorageService,AuthService, BasicUserService } from '../services/index';

@Component({
  selector: 'app-bank-user',
  templateUrl: './bank-user.component.html',
  providers: [BasicUserService]
})
export class BankUserComponent implements OnInit {

  bankFormErrors: any;
  bankForm: FormGroup;


  constructor(
      private router: Router,
      private translate: TranslateService,
      private appConfig: AppConfigService,
      private formBuilder: FormBuilder,
      private alertService: AlertService,
      private appStorage: StorageService,
      private snackBar: MatSnackBar,
      private appSplashScreen: AppSplashScreenService,
      private auth :AuthService,
      private basicservice:BasicUserService
  )
  {
    

      // Use a language
      this.translate.use('br');

  
      this.bankFormErrors = {
        type:{},
        bank       : {},
        branch          : {},
        account       : {}
  
      };
  }


  ngOnInit() {

    this.bankForm = this.formBuilder.group({
      type  : ['', Validators.required],
      bank  : ['', Validators.required],
      branch : ['', Validators.required],
      account : ['', Validators.required],
      llave:this.auth.storage.getCurrentUser()['email']
        
  });
  
  }


  setLanguage(lang)
  {
      // Use the selected language for translations
      this.translate.use(lang);
  }


  bankUser() {
    this.appSplashScreen.show();
    console.log('Register payload: ', this.bankForm.value);

    this.basicservice.createBankUser(this.bankForm.value)
        .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this.setLanguage(this.bankForm.value.language);
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
