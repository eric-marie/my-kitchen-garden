'use strict';

angular.module('static').run(['Menus',
    function(Menus) {
        Menus.addMenuItem('topbar', 'A propos', 'about', '/about', 5, true);
    }
]);
