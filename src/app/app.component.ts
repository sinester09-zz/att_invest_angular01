import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AppSplashScreenService } from './core/services/splash-screen.service';
import { AppTranslationLoaderService } from './core/services/translation-loader.service';
import { AppNavigationService } from './core/components/navigation/navigation.service';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : []
})
export class AppComponent
{
    constructor(
        private translate: TranslateService,
        private appNavigationService: AppNavigationService,
        private appSplashScreen: AppSplashScreenService
       // private appTranslationLoader: AppTranslationLoaderService
    ) {
        // Add languages
        this.translate.addLangs(['br', 'en', 'es']);
        // Set the default language
        this.translate.setDefaultLang('br');
        // Use a language
        this.translate.use('br');
    }
}
