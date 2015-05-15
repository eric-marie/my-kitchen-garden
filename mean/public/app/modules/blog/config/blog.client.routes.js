'use strict';

angular.module('blog').config(['$stateProvider',
	function($stateProvider) {
        $stateProvider
            .state('blog', {
                url: '/blog',
                templateUrl: 'app/modules/blog/views/blog.client.view.html'
            })
            .state('blog-post', {
                url: '/blog/:postId',
                templateUrl: 'app/modules/blog/views/post.client.view.html'
            })
            .state('blog-create', {
                url: '/blog/create',
                templateUrl: 'app/modules/blog/views/create.client.view.html'
            });
	}
]);