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
  selector: 'basic',
  templateUrl: './basic.component.html',
  styles: ['./basic.component.scss']
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
      language       : ['', Validators.required]
  
      
  });
  
  }


  setLanguage(lang)
  {
      // Use the selected language for translations
      this.translate.use(lang);
  }

}
