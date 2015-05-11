'use strict';

angular.module('core').controller('Error500Controller', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);