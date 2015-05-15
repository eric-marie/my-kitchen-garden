'use strict';

angular.module('kitchen-garden').config(['$stateProvider',
	function($stateProvider) {
        $stateProvider
            .state('kitchen-garden', {
                url: '/kitchen-garden',
                templateUrl: 'app/modules/kitchen-garden/views/kitchen-garden.client.view.html'
            });
	}
]);