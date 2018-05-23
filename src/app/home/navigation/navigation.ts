export const navigation = [
    {
        'id'      : 'home',
        'title'   : 'NAV.Home',
        'type'    : 'item',
        'icon'    : 'home',
        'url'      : '/home'
    }, {
        'id'      : 'home',
        'title'   : 'NAV.Person',
        'type'    : 'collapse',
        'icon'    : 'person',
        'children' : [{
            'id'   : 'basic',
            'title': 'NAV.Basic',
            'type' : 'item',
            'icon' : 'chevron_right',
            'url'  : '/basic',
            
        }, {
            'id'   : 'compl',
            'title': 'NAV.Compl',
            'type' : 'item',
            'icon' : 'chevron_right',
            'url'  : '/compl'
        },
        {
            'id'   : 'bank',
            'title': 'NAV.Bank',
            'type' : 'item',
            'icon' : 'chevron_right',
            'url'  : '/bank'
        },

        {
            'id'   : 'doc',
            'title': 'NAV.Doc',
            'type' : 'item',
            'icon' : 'chevron_right',
            'url'  : '/doc'
        }


        , {
            'id'   : 'reset',
            'title': 'NAV.Reset',
            'type' : 'item',
            'icon' : 'chevron_right',
            'url'  : '/reset'
        }]
    }, {
        'id'      : 'info',
        'title'   : 'NAV.Info',
        'type'    : 'item',
        'icon'    : 'info',
        'url'      : '/home'
    }, {
        'id'      : 'legis',
        'title'   : 'NAV.Legis',
        'type'    : 'item',
        'icon'    : 'gavel',
        'url'      : '/home'
    }  

 
];
