'use strict';

angular.module('core').controller('MainController', ['$scope',
	function($scope) {
        // A chaque changement de page...
        $scope.$on('$viewContentLoaded', function() {
            setTimeout(function() {
                // Remonte en haut de page
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                // Relance les script ReStart
                for(var func in window.ReStart) {
                    if(window.ReStart.hasOwnProperty(func)) {
                        window.ReStart[func]();
                    }
                }
            }, 0);
        });
	}
]);