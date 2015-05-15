'use strict';

angular.module('record').config(['$stateProvider',
	function($stateProvider) {
        $stateProvider
            .state('record', {
                url: '/record',
                templateUrl: 'app/modules/record/views/record.client.view.html'
            })
            .state('record-post', {
                url: '/record/:postId',
                templateUrl: 'app/modules/record/views/post.client.view.html'
            })
            .state('record-create', {
                url: '/record/create',
                templateUrl: 'app/modules/record/views/create.client.view.html'
            });
	}
]);