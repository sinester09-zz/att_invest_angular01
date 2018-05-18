import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Platform } from '@angular/cdk/platform';

// Define the default config
const DEFAULT_CONFIG = {
    layout          : {
        navigation      : 'left', // 'right', 'left', 'top', 'none'
        navigationFolded: false, // true, false
        toolbar         : 'below', // 'above', 'below', 'none'
        footer          : 'none', // 'above', 'below', 'none'
        mode            : 'fullwidth' // 'boxed', 'fullwidth'
    },
    colorClasses    : {
        toolbar: 'mat-white-500-bg',
        navbar : 'mat-app-dark-700-bg',
        footer : 'mat-app-dark-900-bg'
    },
    customScrollbars: true,
    routerAnimation : 'fadeIn' // fadeIn, slideUp, slideDown, slideRight, slideLeft, none
};

// Create the injection token for the custom config
export const APP_CONFIG = new InjectionToken('appCustomConfig');

@Injectable()
export class AppConfigService
{
    config: any;
    defaultConfig: any;

    onConfigChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param router
     * @param platform
     * @param config
     */
    constructor(
        private router: Router,
        public platform: Platform,
        @Inject(APP_CONFIG) @Optional() config
    )
    {
        // Set the default settings from the constant
        this.defaultConfig = DEFAULT_CONFIG;

        // If custom config provided with forRoot,
        // use them as default config...
        if ( config )
        {
            this.defaultConfig = config;
        }

        /**
         * Disable Custom Scrollbars if Browser is Mobile
         */
        if ( this.platform.ANDROID || this.platform.IOS )
        {
            this.defaultConfig.customScrollbars = false;
        }

        // Set the config from the default config
        this.config = {...this.defaultConfig};

        // Reload the default settings for the
        // layout on every navigation start
        router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationStart )
                {
                    this.setConfig({
                            layout: this.defaultConfig.layout
                        }
                    );
                }
            }
        );

        // Create the behavior subject
        this.onConfigChanged = new BehaviorSubject(this.config);
    }

    /**
     * Set the new config from given object
     *
     * @param config
     */
    setConfig(config): void
    {
        // Set the config from the given object
        // Ugly, but works for now...
        this.config = {
            ...this.config,
            ...config,
            layout     : {
                ...this.config.layout,
                ...config.layout,
            },
            colorClasses: {
                ...this.config.colorClasses,
                ...config.colorClasses
            }
        };

        // Trigger the event
        this.onConfigChanged.next(this.config);
    }
}

