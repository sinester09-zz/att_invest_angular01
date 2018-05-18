import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfigService } from '../../core/services/config.service';
import { appAnimations } from '../../core/animations';

import { StorageService } from '../../services/index';

@Component({
    selector   : 'mail-confirm',
    templateUrl: './mail-confirm.component.html',
    styleUrls  : ['./mail-confirm.component.scss'],
    animations : appAnimations
})
export class MailConfirmComponent implements OnInit
{
    public emailInfo : string;

    constructor(
        private appConfig: AppConfigService,
        private translate: TranslateService,
        private appStorage: StorageService
    )
    {
        this.appConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });        
    }

    ngOnInit() {
        let lang = this.appStorage.getTemporaryInLocal('lang');
        // Use a language
        this.translate.use(lang);
        this.emailInfo = this.appStorage.getTemporaryInLocal('email');
    }
}
