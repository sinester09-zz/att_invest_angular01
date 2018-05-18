import { NgModule } from '@angular/core';

import { AppIfOnDomDirective } from './app-if-on-dom/app-if-on-dom.directive';
import { AppPerfectScrollbarDirective } from './app-perfect-scrollbar/app-perfect-scrollbar.directive';
import { AppMatSidenavHelperDirective, AppMatSidenavTogglerDirective } from './app-mat-sidenav/app-mat-sidenav.directive';

@NgModule({
    declarations: [
        AppIfOnDomDirective,
        AppMatSidenavHelperDirective,
        AppMatSidenavTogglerDirective,
        AppPerfectScrollbarDirective
    ],
    imports     : [],
    exports     : [
        AppIfOnDomDirective,
        AppMatSidenavHelperDirective,
        AppMatSidenavTogglerDirective,
        AppPerfectScrollbarDirective
    ]
})
export class AppDirectivesModule {}
