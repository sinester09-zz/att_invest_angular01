import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AppConfigService } from '../../core/services/config.service';
import { appAnimations } from '../../core/animations';

import { AlertService, UserService, StorageService } from '../../services/index';

@Component({
    selector   : 'validated-mail',
    templateUrl: './validated-mail.component.html',
    styleUrls  : ['./validated-mail.component.scss'],
    animations : appAnimations
})
export class ValidatedMailComponent implements OnInit
{
    private emailInfo: string;
    private token: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private appConfig: AppConfigService,
        private translate: TranslateService,
        private alertService: AlertService,
        private userService: UserService,
        private appStorage: StorageService,
        private snackBar: MatSnackBar,
    )
    {
        this.appConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });        

        this.route.params.subscribe(params => {
            if(params) {
                this.emailInfo = params['email'];
                this.token = params['token'];
                this.postEmailToken();
            }
        });
    }

    ngOnInit() {
        let lang = this.appStorage.getTemporaryInLocal('lang');
        // Use a language
        this.translate.use(lang);
        this.emailInfo = this.appStorage.getTemporaryInLocal('email');
    }

    postEmailToken() {
        console.info('Request email: ' + this.emailInfo + ' | token: ' + this.token);
        this.userService.confirmEmail(this.emailInfo, this.token).subscribe(
            data => {
                setTimeout(()=>{
                    this.router.navigate(['/login']);
               },6000);
            },
            error => {
                this.alertService.error(error);
                this.snackBar.open("Erro ao tentar validar email. Tente novamente!", "Fechar", {
                    duration: 15000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                });
            }
        );
    }
}
