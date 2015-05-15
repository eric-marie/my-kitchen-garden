'use strict';

angular.module('contact').controller('ContactController', ['$scope', '$http', 'Authentication',
    function($scope, $http, Authentication) {
        $scope.authentication = Authentication;

        $scope.submit = function() {
            if ($scope.contact_form.$valid) {
                $http.post('/contact/submit', $scope.contactform)
                    .success(function(response) {
                        $scope.error = "";
                        $scope.success = response.message;
                        $scope.contactform = {};
                        $scope.contact_form.$setPristine();
                    })
                    .error(function(response) {
                        $scope.error = response.message;
                        $scope.success = "";
                    });
            } else {
                $scope.error = "Tous les champs doivent être renseignés avant de pouvoir soumettre le formulaire.";
                $scope.success = "";
            }
        };
    }
]);