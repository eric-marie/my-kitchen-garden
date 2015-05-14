'use strict';

// Setting up route
angular.module('contact').config(['$stateProvider',
	function($stateProvider) {
        $stateProvider
            .state('contact', {
                url: '/contact',
                templateUrl: 'app/modules/contact/views/contact.client.view.html'
            });
	}
]);