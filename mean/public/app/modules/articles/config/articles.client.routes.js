'use strict';

angular.module('articles').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('articles', {
                url: '/articles',
                templateUrl: 'app/modules/articles/views/list.client.view.html'
            })
            .state('articles-create', {
                url: '/articles/create',
                templateUrl: 'app/modules/articles/views/create.client.view.html'
            })
            .state('articles-show', {
                url: '/articles/:articleId',
                templateUrl: 'app/modules/articles/views/show.client.view.html'
            })
            .state('articles-edit', {
                url: '/articles/:articleId/edit',
                templateUrl: 'app/modules/articles/views/edit.client.view.html'
            });
    }
]);