import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ObservableMedia } from '@angular/flex-layout';
import { CookieService } from 'ngx-cookie-service';

import { AppMatchMediaService } from '../../services/match-media.service';
import { AppNavigationService } from '../../components/navigation/navigation.service';
import { AppConfigService } from '../../services/config.service';

import { navigation } from '../../../home/navigation/navigation';

@Component({
    selector   : 'app-shortcuts',
    templateUrl: './shortcuts.component.html',
    styleUrls  : ['./shortcuts.component.scss']
})
export class AppShortcutsComponent implements OnInit, OnDestroy
{
    shortcutItems: any[] = [];
    navigationItems: any[];
    filteredNavigationItems: any[];
    searching = false;
    mobileShortcutsPanelActive = false;
    toolbarColor: string;
    matchMediaSubscription: Subscription;
    onConfigChanged: Subscription;

    @ViewChild('searchInput') searchInputField;
    @ViewChild('shortcuts') shortcutsEl: ElementRef;

    constructor(
        private renderer: Renderer2,
        private observableMedia: ObservableMedia,
        private appMatchMedia: AppMatchMediaService,
        private appNavigationService: AppNavigationService,
        private appConfig: AppConfigService,
        private cookieService: CookieService
    )
    {
        this.filteredNavigationItems = this.navigationItems = this.appNavigationService.getFlatNavigation(navigation);

        this.onConfigChanged =
            this.appConfig.onConfigChanged
                .subscribe(
                    (newSettings) => {
                        this.toolbarColor = newSettings.colorClasses.toolbar;
                    }
                );
    }

    ngOnInit()
    {
        const cookieExists = this.cookieService.check('APP2.shortcuts');

        if ( cookieExists )
        {
            this.shortcutItems = JSON.parse(this.cookieService.get('APP2.shortcuts'));
        }
        else
        {
            // User's shortcut items
            this.shortcutItems = [
                {
                    'title': 'Calendar',
                    'type' : 'nav-item',
                    'icon' : 'today',
                    'url'  : '/apps/calendar'
                },
                {
                    'title': 'Mail',
                    'type' : 'nav-item',
                    'icon' : 'email',
                    'url'  : '/apps/mail'
                },
                {
                    'title': 'Contacts',
                    'type' : 'nav-item',
                    'icon' : 'account_box',
                    'url'  : '/apps/contacts'
                },
                {
                    'title': 'To-Do',
                    'type' : 'nav-item',
                    'icon' : 'check_box',
                    'url'  : '/apps/todo'
                }
            ];
        }

        this.matchMediaSubscription =
            this.appMatchMedia.onMediaChange.subscribe(() => {
                if ( this.observableMedia.isActive('gt-sm') )
                {
                    this.hideMobileShortcutsPanel();
                }
            });
    }

    ngOnDestroy()
    {
        this.matchMediaSubscription.unsubscribe();
    }

    search(event)
    {
        const value = event.target.value.toLowerCase();

        if ( value === '' )
        {
            this.searching = false;
            this.filteredNavigationItems = this.navigationItems;

            return;
        }

        this.searching = true;

        this.filteredNavigationItems = this.navigationItems.filter((navigationItem) => {
            return navigationItem.title.toLowerCase().includes(value);
        });
    }

    toggleShortcut(event, itemToToggle)
    {
        event.stopPropagation();

        for ( let i = 0; i < this.shortcutItems.length; i++ )
        {
            if ( this.shortcutItems[i].url === itemToToggle.url )
            {
                this.shortcutItems.splice(i, 1);

                // Save to the cookies
                this.cookieService.set('APP2.shortcuts', JSON.stringify(this.shortcutItems));

                return;
            }
        }

        this.shortcutItems.push(itemToToggle);

        // Save to the cookies
        this.cookieService.set('APP2.shortcuts', JSON.stringify(this.shortcutItems));
    }

    isInShortcuts(navigationItem)
    {
        return this.shortcutItems.find(item => {
            return item.url === navigationItem.url;
        });
    }

    onMenuOpen()
    {
        setTimeout(() => {
            this.searchInputField.nativeElement.focus();
        });
    }

    showMobileShortcutsPanel()
    {
        this.mobileShortcutsPanelActive = true;
        this.renderer.addClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
    }

    hideMobileShortcutsPanel()
    {
        this.mobileShortcutsPanelActive = false;
        this.renderer.removeClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
    }
}
