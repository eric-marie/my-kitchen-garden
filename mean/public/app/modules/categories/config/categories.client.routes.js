'use strict';

angular.module('categories').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.
		state('listCategories', {
			url: '/categories',
			templateUrl: 'app/modules/categories/views/list-categories.client.view.html'
		}).
		state('createCategory', {
			url: '/categories/create',
			templateUrl: 'app/modules/categories/views/create-category.client.view.html'
		}).
		state('viewCategory', {
			url: '/categories/:categoryId',
			templateUrl: 'app/modules/categories/views/view-category.client.view.html'
		}).
		state('editCategory', {
			url: '/categories/:categoryId/edit',
			templateUrl: 'app/modules/categories/views/edit-category.client.view.html'
		});
	}
]);
