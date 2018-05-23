import { Component, Input, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AppPerfectScrollbarDirective } from '../../core/directives/app-perfect-scrollbar/app-perfect-scrollbar.directive';
import { AppSidebarService } from '../../core/components/sidebar/sidebar.service';

import { navigation } from '../navigation/navigation';
import { navigation_admin } from '../navigation/navigation_admin';
import { AppNavigationService } from '../../core/components/navigation/navigation.service';
import {AuthService } from '../../services/index';
@Component({
    selector     : 'app-navbar',
    templateUrl  : './navbar.component.html',
    styleUrls    : ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers:[AuthService]
})
//colocar oninit , recorrer ng para aceptar los ids que el navigation va apsasar
//con las opciones de menu ,sim ,antes del = ok 
export class AppNavbarComponent implements OnDestroy
{
    private appPerfectScrollbar: AppPerfectScrollbarDirective;

    @ViewChild(AppPerfectScrollbarDirective) set directive(theDirective: AppPerfectScrollbarDirective)
    {
        if ( !theDirective )
        {
            return;
        }

        this.appPerfectScrollbar = theDirective;

        this.navigationServiceWatcher =
            this.navigationService.onItemCollapseToggled.subscribe(() => {
                this.appPerfectScrollbarUpdateTimeout = setTimeout(() => {
                    this.appPerfectScrollbar.update();
                }, 310);
            });
    }

    @Input() layout;
    navigation: any;
    navigationServiceWatcher: Subscription;
    appPerfectScrollbarUpdateTimeout;
//ngOnInit{
//
//}


    constructor(
        private sidebarService: AppSidebarService,
        private navigationService: AppNavigationService,
        private auth :AuthService
    )
    {
        // Navigation data
        this.navigation = this.loadmenu();// aqui adminnavif o clientnaigoac entendi sim... sim 
        console.log(this.loadmenu());
        // Default layout
        this.layout = 'vertical';
    }

    ngOnDestroy()
    {
        if ( this.appPerfectScrollbarUpdateTimeout )
        {
            clearTimeout(this.appPerfectScrollbarUpdateTimeout);
        }

        if ( this.navigationServiceWatcher )
        {
            this.navigationServiceWatcher.unsubscribe();
        }
    }

    toggleSidebarOpened(key)
    {
        this.sidebarService.getSidebar(key).toggleOpen();
    }

    toggleSidebarFolded(key)
    {
        this.sidebarService.getSidebar(key).toggleFold();
    }

    loadmenu(){

        if(this.auth.isAdminUser()==true){
          
          return navigation_admin;
        
           
        }
        else{
            return navigation;
        
        }

    }
}
