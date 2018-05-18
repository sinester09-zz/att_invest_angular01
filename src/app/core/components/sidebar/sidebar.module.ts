import { NgModule } from '@angular/core';

import { AppSidebarComponent } from './sidebar.component';

@NgModule({
    declarations: [
        AppSidebarComponent
    ],
    exports     : [
        AppSidebarComponent
    ]
})
export class AppSidebarModule {}
