'use strict';

angular.module('forum').config(['$stateProvider',
	function($stateProvider) {
        $stateProvider
            .state('forum', {
                url: '/forum',
                templateUrl: 'app/modules/forum/views/forum.client.view.html'
            })
            .state('forum-category', {
                url: '/forum/:categoryId',
                templateUrl: 'app/modules/forum/views/category.client.view.html'
            })
            .state('forum-post', {
                url: '/forum/:postId',
                templateUrl: 'app/modules/forum/views/post.client.view.html'
            })
            .state('forum-create', {
                url: '/forum/create',
                templateUrl: 'app/modules/forum/views/create.client.view.html'
            });
	}
]);