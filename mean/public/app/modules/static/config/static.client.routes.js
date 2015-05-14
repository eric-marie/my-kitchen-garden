'use strict';

// Setting up route
angular.module('static').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('about', {
                url: '/about',
                templateUrl: 'app/modules/static/views/about.client.view.html'
            })
            .state('disclaimer', {
                url: '/disclaimer',
                templateUrl: 'app/modules/static/views/disclaimer.client.view.html'
            });
    }
]);