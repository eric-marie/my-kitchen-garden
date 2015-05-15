'use strict';

angular.module('products').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.
		state('listProducts', {
			url: '/products',
			templateUrl: 'app/modules/products/views/list-products.client.view.html'
		}).
		state('createProduct', {
			url: '/products/create',
			templateUrl: 'app/modules/products/views/create-product.client.view.html'
		}).
		state('viewProduct', {
			url: '/products/:productId',
			templateUrl: 'app/modules/products/views/view-product.client.view.html'
		}).
		state('editProduct', {
			url: '/products/:productId/edit',
			templateUrl: 'app/modules/products/views/edit-product.client.view.html'
		});
	}
]);