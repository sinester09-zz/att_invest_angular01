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
import { BasicUser } from '../models/basic_user';


@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',

})
export class AdminComponent implements OnInit {
 
  basicusers: BasicUser[];

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
      
  }


  ngOnInit() {
 
    this.userService.getAll()
    .subscribe( data => {

      this.basicusers=data
    });

  };

  Aprove(user: BasicUser): void {
    this.userService.aprove(user)
      .subscribe( data => {
        this.basicusers = this.basicusers.filter(u => u !== user);
      })
  };
  



}
