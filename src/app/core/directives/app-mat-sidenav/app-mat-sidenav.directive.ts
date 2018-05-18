import { Directive, Input, OnInit, HostListener, OnDestroy, HostBinding } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';

import { AppMatchMediaService } from '../../services/match-media.service';
import { AppMatSidenavHelperService } from './app-mat-sidenav.service';

@Directive({
    selector: '[appMatSidenavHelper]'
})
export class AppMatSidenavHelperDirective implements OnInit, OnDestroy
{
    matchMediaSubscription: Subscription;
    @HostBinding('class.mat-is-locked-open') isLockedOpen = true;
    @Input('appMatSidenavHelper') id: string;
    @Input('mat-is-locked-open') matIsLockedOpenBreakpoint: string;

    constructor(
        private appMatSidenavService: AppMatSidenavHelperService,
        private appMatchMedia: AppMatchMediaService,
        private observableMedia: ObservableMedia,
        private matSidenav: MatSidenav
    ) {}

    ngOnInit()
    {
        this.appMatSidenavService.setSidenav(this.id, this.matSidenav);

        if ( this.observableMedia.isActive(this.matIsLockedOpenBreakpoint) )
        {
            this.isLockedOpen = true;
            this.matSidenav.mode = 'side';
            this.matSidenav.toggle(true);
        }
        else
        {
            this.isLockedOpen = false;
            this.matSidenav.mode = 'over';
            this.matSidenav.toggle(false);
        }

        this.matchMediaSubscription = this.appMatchMedia.onMediaChange.subscribe(() => {
            if ( this.observableMedia.isActive(this.matIsLockedOpenBreakpoint) )
            {
                this.isLockedOpen = true;
                this.matSidenav.mode = 'side';
                this.matSidenav.toggle(true);
            }
            else
            {
                this.isLockedOpen = false;
                this.matSidenav.mode = 'over';
                this.matSidenav.toggle(false);
            }
        });
    }

    ngOnDestroy()
    {
        this.matchMediaSubscription.unsubscribe();
    }
}

@Directive({
    selector: '[appMatSidenavToggler]'
})
export class AppMatSidenavTogglerDirective
{
    @Input('appMatSidenavToggler') id;

    constructor(private appMatSidenavService: AppMatSidenavHelperService)
    {
    }

    @HostListener('click')
    onClick()
    {
        this.appMatSidenavService.getSidenav(this.id).toggle();
    }
}
