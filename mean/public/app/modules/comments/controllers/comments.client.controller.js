'use strict';

angular.module('comments').controller('CommentsController', [
    '$scope',
    'Authentication',
    'Comments',
    'Roles',
    'ProfilePhoto',
    function ($scope, Authentication, Comments, Roles, ProfilePhoto) {
        $scope.authentication = Authentication;
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.offset = 0;
        $scope.isAdmin = Roles.isAdmin($scope.authentication.user);
        $scope.isUser = Roles.isUser($scope.authentication.user);

        $scope.getProfilePhoto = ProfilePhoto.getProfilePhoto;

        // Page changed handler
        $scope.pageChanged = function () {
            $scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
            // Relance les script ReStart
            for (var func in window.ReStart) {
                if (window.ReStart.hasOwnProperty(func)) {
                    window.ReStart[func]();
                }
            }
        };

        // Create new Comment
        $scope.create = function () {
            // Create new Comment object
            var comment = new Comments({
                parentName: this.parentName,
                parentId: this.parentId,
                content: this.comment.content
            });

            if (comment.content) {
                // Redirect after save
                comment.$save(function (response) {
                    // Clear form fields
                    $scope.comment = {};
                    $scope.comment_form.$setPristine();
                    $scope.find();
                    $scope.currentPage = 1;
                    $scope.offset = 0;
                    $scope.parentRefresh();
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            }
        };

        // Remove existing Comment
        $scope.remove = function (comment) {
            if (confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) {
                comment.$remove({
                    parentName: $scope.parentName,
                    parentId: $scope.parentId
                }, function (response) {
                    for (var i in $scope.comments) {
                        if ($scope.comments [i] === comment) {
                            $scope.comments.splice(i, 1);
                            $scope.currentPage = 1;
                            $scope.offset = 0;
                            $scope.parentRefresh();
                        }
                    }
                });
            }
        };

        // Find a list of Comments
        $scope.find = function () {
            var comments = Comments.query({
                parentName: $scope.parentName,
                parentId: $scope.parentId
            });

            setTimeout(function() {
                $scope.comments = [];
                var commentList = [];
                if('articles' == $scope.parentName) {
                    commentList = $scope.article.comments;
                } else if('discussions' == $scope.parentName) {
                    commentList = $scope.discussion.comments;
                }
                for(var key in comments) {
                    if(comments.hasOwnProperty(key) && 0 <= commentList.indexOf(comments[key]._id)) {
                        $scope.comments.push(comments[key]);
                    }
                }
            }, 200);
        };
    }
]);
