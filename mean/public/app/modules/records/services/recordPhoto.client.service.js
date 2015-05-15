'use strict';

angular.module('records').service('RecordPhoto', [
    function() {
        var timestamp = Date.now();
        this.refreshTimestamp = function() {
            timestamp = Date.now();
        };
        this.getRecordPhoto = function(record) {
            var recordPhoto = '/images/logo.png';
            if(record && record.recordPhoto) {
                recordPhoto = '/upload/record-photo/' + record.recordPhoto + '?' + timestamp;
            }
            return recordPhoto;
        }
    }
]);