'use strict';

angular.module('articles').run(['Menus',
    function(Menus) {
        Menus.addMenuItem('topbar', 'Blog', 'articles', '/articles(/create)?', 3, true);
    }
]);