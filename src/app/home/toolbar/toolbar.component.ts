import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AppConfigService } from '../../core/services/config.service';
import { AppSidebarService } from '../../core/components/sidebar/sidebar.service';

import { StorageService } from '../../services/index';
import { CurrentUser } from '../../models/index';

@Component({
    selector   : 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls  : ['./toolbar.component.scss']
})

export class AppToolbarComponent implements OnInit {
    userStatusOptions: any[];
    languages: any;
    selectedLanguage: any;
    showLoadingBar: boolean;
    horizontalNav: boolean;
    noNav: boolean;
    currentUser: CurrentUser;
    
    constructor(
        private router: Router,
        private appConfig: AppConfigService,
        private sidebarService: AppSidebarService,
        private translate: TranslateService,
        private storage: StorageService,
    )
    {
        this.currentUser = this.storage.getCurrentUser();
        this.translate.use(this.currentUser.lang);
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon' : 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon' : 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon' : 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationStart )
                {
                    this.showLoadingBar = true;
                }
                if ( event instanceof NavigationEnd )
                {
                    this.showLoadingBar = false;
                }
            });

        this.appConfig.onConfigChanged.subscribe((settings) => {
            this.horizontalNav = settings.layout.navigation === 'top';
            this.noNav = settings.layout.navigation === 'none';
        });

    }

    ngOnInit() {
        this.languages = [
            { 'id': 'br', 'title': 'Português Br', 'flag': 'br' },
            { 'id': 'en', 'title': 'Inglês', 'flag': 'us' },
            { 'id': 'es', 'title': 'Espanhol', 'flag': 'es' }
        ];

        this.translate.get('LANGbr').subscribe(value => {
            this.languages[0].title = value;
        });

        this.translate.get('LANGen').subscribe(value => {
            this.languages[1].title = value;
        });

        this.translate.get('LANGes').subscribe(value => {
            this.languages[2].title = value;
        });

        let i = (this.currentUser.lang === 'br' ? 0 : (this.currentUser.lang === 'en' ? 1 : 2));
        this.selectedLanguage = this.languages[i];
    }

    toggleSidebarOpened(key)
    {
        this.sidebarService.getSidebar(key).toggleOpen();
    }

    search(value)
    {
        // Do your search here...
        console.log(value);
    }

    setLanguage(lang) {
        // Set the selected language for toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this.translate.use(lang.id);
    }

    logout() {
        this.storage.setCurrentUser(null);
        this.router.navigate(['/login']);
    }
}
