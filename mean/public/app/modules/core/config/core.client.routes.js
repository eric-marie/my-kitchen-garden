'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirection vers Error404 s'il n'y a pas de route
		$urlRouterProvider.otherwise('/404');

        $stateProvider
            .state('homeRoot', {
                url: '',
                templateUrl: 'app/modules/core/views/home.client.view.html'
            })
            .state('home', {
                url: '/',
                templateUrl: 'app/modules/core/views/home.client.view.html'
            })
            .state('404', {
                url: '/404',
                templateUrl: 'app/modules/core/views/404.client.view.html'
            })
            .state('500', {
                url: '/500',
                templateUrl: 'app/modules/core/views/500.client.view.html'
            });
	}
]);