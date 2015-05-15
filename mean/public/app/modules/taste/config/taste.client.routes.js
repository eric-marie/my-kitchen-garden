'use strict';

angular.module('taste').config(['$stateProvider',
	function($stateProvider) {
        $stateProvider
            .state('taste', {
                url: '/taste',
                templateUrl: 'app/modules/taste/views/taste.client.view.html'
            });
	}
]);