'use strict';

angular.module('static').controller('AboutController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        $scope.authentication = Authentication;
    }
]);