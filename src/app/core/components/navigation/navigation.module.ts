import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatRippleModule } from '@angular/material';

import { TranslateModule } from '@ngx-translate/core';

import { AppNavigationComponent } from './navigation.component';
import { AppNavVerticalItemComponent } from './vertical/nav-item/nav-vertical-item.component';
import { AppNavVerticalCollapseComponent } from './vertical/nav-collapse/nav-vertical-collapse.component';
import { AppNavVerticalGroupComponent } from './vertical/nav-group/nav-vertical-group.component';
import { AppNavHorizontalItemComponent } from './horizontal/nav-item/nav-horizontal-item.component';
import { AppNavHorizontalCollapseComponent } from './horizontal/nav-collapse/nav-horizontal-collapse.component';

@NgModule({
    imports     : [
        CommonModule,
        RouterModule,

        MatIconModule,
        MatRippleModule,

        TranslateModule.forChild()
    ],
    exports     : [
        AppNavigationComponent
    ],
    declarations: [
        AppNavigationComponent,
        AppNavVerticalGroupComponent,
        AppNavVerticalItemComponent,
        AppNavVerticalCollapseComponent,
        AppNavHorizontalItemComponent,
        AppNavHorizontalCollapseComponent
    ]
})
export class AppNavigationModule {}
