import { Component, ElementRef, HostBinding, Inject, OnDestroy, Renderer2, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { Subscription } from 'rxjs/Subscription';

import { AppConfigService } from '../core/services/config.service';

@Component({
    selector     : 'app-default-layout',
    templateUrl  : './default-layout.component.html',
    styleUrls    : ['./default-layout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DefaultLayoutComponent implements OnDestroy
{
    onConfigChanged: Subscription;
    appSettings: any;
    @HostBinding('attr.app-layout-mode') layoutMode;

    constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        private appConfig: AppConfigService,
        private platform: Platform,
        @Inject(DOCUMENT) private document: any
    )
    {
        this.onConfigChanged =
            this.appConfig.onConfigChanged
                .subscribe(
                    (newSettings) => {
                        this.appSettings = newSettings;
                        this.layoutMode = this.appSettings.layout.mode;
                    }
                );

        if ( this.platform.ANDROID || this.platform.IOS )
        {
            this.document.body.className += ' is-mobile';
        }
    }

    ngOnDestroy()
    {
        this.onConfigChanged.unsubscribe();
    }

    addClass(className: string)
    {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }

    removeClass(className: string)
    {
        this._renderer.removeClass(this._elementRef.nativeElement, className);
    }
}
