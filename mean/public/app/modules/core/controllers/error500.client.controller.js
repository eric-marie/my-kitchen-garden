'use strict';

angular.module('core').controller('Error500Controller', ['$scope', 'Authentication',
	function($scope, Authentication) {
		$scope.authentication = Authentication;
	}
]);