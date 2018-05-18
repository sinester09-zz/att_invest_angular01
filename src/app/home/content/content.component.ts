import { Component, HostBinding, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { appAnimations } from '../../core/animations/index';
import { AppConfigService } from '../../core/services/config.service';

@Component({
    selector   : 'app-content',
    templateUrl: './content.component.html',
    styleUrls  : ['./content.component.scss'],
    animations : appAnimations
})
export class ContentComponent implements OnDestroy
{
    onConfigChanged: Subscription;
    appSettings: any;

    @HostBinding('@routerTransitionUp') routeAnimationUp = false;
    @HostBinding('@routerTransitionDown') routeAnimationDown = false;
    @HostBinding('@routerTransitionRight') routeAnimationRight = false;
    @HostBinding('@routerTransitionLeft') routeAnimationLeft = false;
    @HostBinding('@routerTransitionFade') routeAnimationFade = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private appConfig: AppConfigService
    )
    {
        this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .subscribe((event) => {
                switch ( this.appSettings.routerAnimation )
                {
                    case 'fadeIn':
                        this.routeAnimationFade = !this.routeAnimationFade;
                        break;
                    case 'slideUp':
                        this.routeAnimationUp = !this.routeAnimationUp;
                        break;
                    case 'slideDown':
                        this.routeAnimationDown = !this.routeAnimationDown;
                        break;
                    case 'slideRight':
                        this.routeAnimationRight = !this.routeAnimationRight;
                        break;
                    case 'slideLeft':
                        this.routeAnimationLeft = !this.routeAnimationLeft;
                        break;
                }
            });

        this.onConfigChanged =
            this.appConfig.onConfigChanged
                .subscribe(
                    (newSettings) => {
                        this.appSettings = newSettings;
                    }
                );
    }

    ngOnDestroy()
    {
        this.onConfigChanged.unsubscribe();
    }
}
