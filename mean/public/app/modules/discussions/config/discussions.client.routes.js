'use strict';

angular.module('discussions').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('discussions', {
                url: '/discussions',
                templateUrl: 'app/modules/discussions/views/list.client.view.html'
            })
            .state('discussions-create', {
                url: '/discussions/create',
                templateUrl: 'app/modules/discussions/views/create.client.view.html'
            })
            .state('discussions-show', {
                url: '/discussions/:discussionId',
                templateUrl: 'app/modules/discussions/views/show.client.view.html'
            })
            .state('discussions-edit', {
                url: '/discussions/:discussionId/edit',
                templateUrl: 'app/modules/discussions/views/edit.client.view.html'
            });
    }
]);