'use strict';

angular.module('comments').factory('Comments', ['$resource',
    function ($resource) {
        return $resource('comments/:parentName/:parentId/:commentId', {
            parentName: '@parentName',
            parentId: '@parentId',
            commentId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
