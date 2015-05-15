'use strict';

angular.module('core').controller('Error404Controller', ['$scope', 'Authentication',
	function($scope, Authentication) {
		$scope.authentication = Authentication;
	}
]);