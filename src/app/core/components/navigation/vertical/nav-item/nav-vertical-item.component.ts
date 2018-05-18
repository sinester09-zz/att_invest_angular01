import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector   : 'app-nav-vertical-item',
    templateUrl: './nav-vertical-item.component.html',
    styleUrls  : ['./nav-vertical-item.component.scss']
})
export class AppNavVerticalItemComponent
{
    @HostBinding('class') classes = 'nav-item';
    @Input() item: any;

    constructor()
    {
    }
}
