import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { StorageServiceModule} from 'angular-webstorage-service';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import 'hammerjs';

import { AppMaterialModule } from './app-material.module';
import './rxjs-operators';

import { AppToolsModule } from './core/app.module';
import { AppSharedModule } from './core/shared.module';
import { AppNavigationModule, AppSidebarModule } from './core/components';

import { appConfig } from './config/app-config';
import { routing }        from './app.routing';
// Imports components
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { Error404Component } from './errors/404/error-404.component';
import { AppNavbarComponent } from './home/navbar/navbar.component';
import { AppToolbarComponent } from './home/toolbar/toolbar.component';
import { ContentComponent } from './home/content/content.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './authentication/register/register.component';
import { MailConfirmComponent } from './authentication/mail-confirm/mail-confirm.component';
import { ValidatedMailComponent } from './authentication/validated-mail/validated-mail.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { LoginComponent } from './authentication/login/login.component';

import { AppStoreModule } from './store/store.module';

import { AlertService, UserService, AuthService, Security, StorageService } from './services/index';
import { BasicComponent } from './basic/basic.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { ComplementUserComponent } from './complement-user/complement-user.component';
import { BankUserComponent } from './bank-user/bank-user.component';
import { DocsUserComponent } from './docs-user/docs-user.component';

export function translateHttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        StorageServiceModule,
        HttpClientModule,    

        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: translateHttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        // Homr Main and Shared modules
        AppToolsModule.forRoot(appConfig),        
        AppSharedModule,
        AppStoreModule,
        AppNavigationModule,
        AppSidebarModule,
        routing,
        AppMaterialModule
    ],
    declarations: [
        AppComponent,
        Error404Component,
        AppNavbarComponent,
        AppToolbarComponent,
        ContentComponent,
        HomeComponent,
        RegisterComponent,
        MailConfirmComponent,
        ValidatedMailComponent,
        ForgotPasswordComponent,
        LoginComponent,
        BasicComponent,
        DefaultLayoutComponent,
        ComplementUserComponent,
        BankUserComponent,
        DocsUserComponent
    ],    
    providers: [
        AlertService,
        UserService,
        Security,
        AuthInterceptor,
        AuthService,
        StorageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
