'use strict';

angular.module('discussions').run(['Menus',
    function(Menus) {
        Menus.addMenuItem('topbar', 'Forum', 'discussions', '/discussions(/create)?', 4, true);
    }
]);