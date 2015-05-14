'use strict';

angular.module('static').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        Menus.addMenuItem('topbar', 'A propos', 'about', '/about', 5, true);
    }
]);
