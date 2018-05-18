import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { APP_CONFIG, AppConfigService } from './services/config.service';
import { AppCopierService } from './services/copier.service';
import { AppMatchMediaService } from './services/match-media.service';
import { AppMatSidenavHelperService } from './directives/app-mat-sidenav/app-mat-sidenav.service';
import { AppNavigationService } from './components/navigation/navigation.service';
import { AppSidebarService } from './components/sidebar/sidebar.service';
import { AppSplashScreenService } from './services/splash-screen.service';
import { AppTranslationLoaderService } from './services/translation-loader.service';

@NgModule({
    entryComponents: [],
    providers      : [
        AppConfigService,
        AppCopierService,
        AppMatchMediaService,
        AppMatSidenavHelperService,
        AppNavigationService,
        AppSidebarService,        
        AppSplashScreenService,
        AppTranslationLoaderService
    ]
})
export class AppToolsModule
{
    constructor(@Optional() @SkipSelf() parentModule: AppToolsModule)
    {
        if ( parentModule )
        {
            throw new Error('AppToolsModule is already loaded. Import it in the AppToolsModule only!');
        }
    }

    static forRoot(config): ModuleWithProviders
    {
        return {
            ngModule : AppToolsModule,
            providers: [
                {
                    provide : APP_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
