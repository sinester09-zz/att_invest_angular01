import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector     : 'app-navigation',
    templateUrl  : './navigation.component.html',
    styleUrls    : ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppNavigationComponent
{
    @Input() layout = 'vertical';
    @Input() navigation: any;

    constructor()
    {

    }
}
