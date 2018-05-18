import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { AppConfigService } from '../core/services/config.service';
import { AppSplashScreenService } from '../core/services/splash-screen.service';
import { appAnimations } from '../core/animations';
import { AlertService, UserService, StorageService } from '../services/index';

@Component({
  selector: 'app-bank-user',
  templateUrl: './bank-user.component.html',
  styles: []
})
export class BankUserComponent implements OnInit {

  bankFormErrors: any;
  bankForm: FormGroup;


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
      account : ['', Validators.required]
        
  });
  
  }


  setLanguage(lang)
  {
      // Use the selected language for translations
      this.translate.use(lang);
  }
}
