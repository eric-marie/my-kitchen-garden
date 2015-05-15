'use strict';

angular.module('records').factory('Records', ['$resource',
    function ($resource) {
        return $resource('records/:recordId', {
            recordId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
