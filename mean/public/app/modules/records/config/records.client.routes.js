'use strict';

angular.module('records').config(['$stateProvider',
	function($stateProvider) {
        $stateProvider
            .state('records', {
                url: '/records',
                templateUrl: 'app/modules/records/views/list.client.view.html'
            })
            .state('records-create', {
                url: '/records/create',
                templateUrl: 'app/modules/records/views/create.client.view.html'
            })
            .state('records-show', {
                url: '/records/:recordId',
                templateUrl: 'app/modules/records/views/show.client.view.html'
            })
            .state('records-edit', {
                url: '/records/:recordId/edit',
                templateUrl: 'app/modules/records/views/edit.client.view.html'
            });
	}
]);