import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { AppSharedModule } from '../../core/shared.module';

import { ResetPasswordComponent } from './reset-password.component';

const routes = [{ path: 'auth/reset-password', component: ResetPasswordComponent }];

@NgModule({
    declarations: [
        ResetPasswordComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,

        AppSharedModule
    ]
})
export class ResetPasswordModule {}
