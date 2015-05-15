'use strict';

angular.module('articles').controller('ArticlesController', [
    '$scope',
    '$stateParams',
    '$location',
    '$http',
    'Upload',
    'Authentication',
    'Articles',
    'Roles',
    function ($scope, $stateParams, $location, $http, Upload, Authentication, Articles, Roles) {
        $scope.authentication = Authentication;
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.offset = 0;
        $scope.isAdmin = Roles.isAdmin($scope.authentication.user);

        $scope.categories = [
            { value: 'Technique', label: 'Technique' },
            { value: 'Annonce', label: 'Annonce' },
            { value: 'Calendrier', label: 'Calendrier' },
            { value: 'Bien débuter', label: 'Bien débuter' },
            { value: 'Matériel', label: 'Matériel' }
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

        // Create new Article
        $scope.create = function () {
            // Create new Article object
            var article = new Articles({
                name: this.article.name,
                description: this.article.description,
                category: this.article.category
            });

            // Redirect after save
            article.$save(function (response) {
                // Clear form fields
                $scope.article = {};
                $location.path('articles/' + response._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Article
        $scope.remove = function (article) {
            if(confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
                if (article) {
                    article.$remove();

                    for (var i in $scope.articles) {
                        if ($scope.articles [i] === article) {
                            $scope.articles.splice(i, 1);
                        }
                    }
                } else {
                    $scope.article.$remove(function () {
                        $location.path('articles');
                    });
                }
            }
        };

        // Update existing Article
        $scope.update = function () {
            var article = $scope.article;

            article.$update(function () {
                $location.path('articles/' + article._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Articles
        $scope.find = function () {
            $scope.articles = Articles.query();
        };

        // Find existing Article
        $scope.findOne = function () {
            $scope.article = Articles.get({
                articleId: $stateParams.articleId
            });
        };

        // Search for a article
        $scope.articleSearch = function (product) {
            $location.path('articles/' + product._id);
        };
    }
]);
