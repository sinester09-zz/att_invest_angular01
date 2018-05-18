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
  selector: 'app-complement-user',
  templateUrl: './complement-user.component.html',
  styles: []
})
export class ComplementUserComponent implements OnInit {
  complFormErrors: any;
  complForm: FormGroup;


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

  
      this.complFormErrors = {
          country       : {},
          state          : {},
          city       : {},
          zip:{},
          street:{},
          number:{},
          complement:{}
      };
  }


  ngOnInit() {

    this.complForm = this.formBuilder.group({
      country       : ['', Validators.required],
      state          : ['', [Validators.required]],
      city       : ['', Validators.required],
      zip       : ['', Validators.required],
      street  : ['', Validators.required],
      number : ['', Validators.required],
      complement : ['', Validators.required]
        
  });
  
  }


  setLanguage(lang)
  {
      // Use the selected language for translations
      this.translate.use(lang);
  }



}
