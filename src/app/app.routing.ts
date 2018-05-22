import { Routes, RouterModule } from '@angular/router';

import { Error404Component } from './errors/404/error-404.component';
import { HomeComponent } from './home/home.component';
import { BasicComponent } from './basic/basic.component';
import { RegisterComponent } from './authentication/register/register.component';
import { MailConfirmComponent } from './authentication/mail-confirm/mail-confirm.component';
import { ValidatedMailComponent } from './authentication/validated-mail/validated-mail.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { LoginComponent } from './authentication/login/login.component';
import { Security } from './services/index';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import {ComplementUserComponent  } from './complement-user/complement-user.component';
import { BankUserComponent } from './bank-user/bank-user.component';
import {DocsUserComponent  } from './docs-user/docs-user.component';


import {AdminAuthGuard} from './guards/admin-auth-guard.service';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [   

    { path: 'register', component: RegisterComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'mail-confirm', component: MailConfirmComponent },
    { path: 'validated-mail', component: ValidatedMailComponent },
    { path: 'login', component: LoginComponent },
    { path: '', component: DefaultLayoutComponent, children: [
        {
            path: '', redirectTo: 'home', pathMatch: 'full'
        },
        { path: 'home', component: HomeComponent, canActivate: [Security] },
        { path: 'basic', component: BasicComponent, canActivate: [Security] },
        { path: 'compl', component: ComplementUserComponent, canActivate: [Security] },
        { path: 'bank', component: BankUserComponent, canActivate: [Security] },
        { path: 'doc', component: DocsUserComponent, canActivate: [Security] },
    ] },

    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminAuthGuard,Security]
      },

    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    { path: '**', component: Error404Component }
];

export const routing = RouterModule.forRoot(appRoutes);