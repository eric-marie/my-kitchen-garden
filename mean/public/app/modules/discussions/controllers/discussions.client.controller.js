'use strict';

angular.module('discussions').controller('DiscussionsController', [
    '$scope',
    '$stateParams',
    '$location',
    '$http',
    'Authentication',
    'Discussions',
    'Roles',
    function ($scope, $stateParams, $location, $http, Authentication, Discussions, Roles) {
        $scope.authentication = Authentication;
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.offset = 0;
        $scope.isAdmin = Roles.isAdmin($scope.authentication.user);
        $scope.isUser = Roles.isUser($scope.authentication.user);

        $scope.categoriesStat = [];
        $scope.categories = [
            'Mon potager',
            'Astuces du jardin',
            'Recettes',
            'Echange de semances',
            'Détente'
        ];
        $scope.filterCategory = function (category) {
            return category == $scope.categorySearch ? 'active' : '';
        };
        $scope.setFilterCategory = function (category) {
            $scope.categorySearch = category;
        };
        $scope.setFilterCategory();

        // Page changed handler
        $scope.pageChanged = function () {
            $scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
            // Relance les script ReStart
            for(var func in window.ReStart) {
                if(window.ReStart.hasOwnProperty(func)) {
                    window.ReStart[func]();
                }
            }
        };

        // Create new Discussion
        $scope.create = function () {
            // Create new Discussion object
            var discussion = new Discussions({
                name: this.discussion.name,
                description: this.discussion.description,
                category: this.discussion.category
            });

            // Redirect after save
            discussion.$save(function (response) {
                // Clear form fields
                $scope.discussion = {};
                $location.path('discussions/' + response._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Discussion
        $scope.remove = function (discussion) {
            if(confirm("Êtes-vous sûr de vouloir supprimer cette discussion ?")) {
                if (discussion) {
                    discussion.$remove();

                    for (var i in $scope.discussions) {
                        if ($scope.discussions [i] === discussion) {
                            $scope.discussions.splice(i, 1);
                        }
                    }
                } else {
                    $scope.discussion.$remove(function () {
                        $location.path('discussions');
                    });
                }
            }
        };

        // Update existing Discussion
        $scope.update = function () {
            var discussion = $scope.discussion;

            discussion.$update(function () {
                $location.path('discussions/' + discussion._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        var setCategoriesStat = function(response) {
            var categoriesStat = {};
            for(var category in $scope.categories) {
                if($scope.categories.hasOwnProperty(category)) {
                    categoriesStat[$scope.categories[category]] = {
                        name: $scope.categories[category],
                        lastDiscussion: {},
                        total: 0
                    }
                }
            }
            for(var key in response) {
                if(response.hasOwnProperty(key)) {
                    if('undefined' != typeof categoriesStat[response[key]._id[0]]) {
                        categoriesStat[response[key]._id[0]].lastDiscussion = response[key].lastDiscussion[0];
                        categoriesStat[response[key]._id[0]].total = response[key].total;
                    }
                }
            }
            $scope.categoriesStat = categoriesStat;
        };

        // Find a list of Discussions
        $scope.find = function () {
            $scope.discussions = Discussions.query();
            $http.get('/discussions/statistics')
                .success(function(response) {
                    setCategoriesStat(response);
                });
        };

        // Find existing Discussion
        $scope.findOne = function () {
            $scope.discussion = Discussions.get({
                discussionId: $stateParams.discussionId
            });
            $scope.parentId = $stateParams.discussionId;
        };

        // Search for a discussion
        $scope.discussionSearch = function (discussion) {
            $location.path('discussions/' + discussion._id);
        };

        // these vars is important for CommentController
        $scope.parentName = 'discussions';
        $scope.parentId = null;
        $scope.parentRefresh = $scope.findOne;
    }
]);
