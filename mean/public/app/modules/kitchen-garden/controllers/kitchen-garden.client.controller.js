'use strict';

angular.module('kitchen-garden').controller('KitchenGardenController', [
    '$scope',
    '$stateParams',
    '$location',
    '$http',
    'Authentication',
    'KitchenGarden',
    'Roles',
    function ($scope, $stateParams, $location, $http, Authentication, KitchenGarden, Roles) {
        $scope.authentication = Authentication;
        $scope.isAdmin = Roles.isAdmin($scope.authentication.user);
        $scope.isUser = Roles.isUser($scope.authentication.user);

        $scope.mri = {
            ingredient: '',
            type: '',
            vegetarian: '',
            count: ''
        };
        $scope.currentPage = 1;
        $scope.typeOptions = KitchenGarden.getOptions();
        $scope.results = [];

        $scope.search = function() {
            if(1 == $scope.currentPage) {
                $scope.results = [];
            }
            var results = KitchenGarden.getResults($scope.mri.ingredient, $scope.mri.type, $scope.mri.vegetarian, $scope.currentPage, $scope.results);
            $scope.results = results.results;
            $scope.mri.count = results.count;
            $scope.currentPage++;
        };
    }
]);
