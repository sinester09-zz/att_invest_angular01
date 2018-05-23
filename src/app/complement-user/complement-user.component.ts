import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { AppConfigService } from '../core/services/config.service';
import { AppSplashScreenService } from '../core/services/splash-screen.service';
import { appAnimations } from '../core/animations';
import { AlertService, BasicUserService, StorageService,AuthService } from '../services/index';


@Component({
  selector: 'app-complement-user',
  templateUrl: './complement-user.component.html',
  styles: [],
  providers:[BasicUserService]
})
export class ComplementUserComponent implements OnInit {
  complFormErrors: any;
  complForm: FormGroup;


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
      private auth : AuthService,
    
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
      complement : ['', Validators.required],
      llave:this.auth.storage.getCurrentUser()['email']
        
  });
  
  }


  setLanguage(lang)
  {
      // Use the selected language for translations
      this.translate.use(lang);
  }

  ValidateForm() {
    this.appSplashScreen.show();
    console.log('Register payload: ', this.complForm.value);

    this.basicservice.createCompleUser(this.complForm.value)
        .subscribe(
            data => {
                this.alertService.success('Registration successful', true);
                this.setLanguage(this.complForm.value.language);
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
