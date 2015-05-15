'use strict';

angular.module('core').service('ProfilePhoto', [
    function() {
        var timestamp = Date.now();
        this.refreshTimestamp = function() {
            timestamp = Date.now();
        };
        this.getProfilePhoto = function(user) {
            var profilePhoto = '/images/logo.png';
            if(user && user.profilePhoto) {
                profilePhoto = '/upload/' + user._id + '.' + user.profilePhoto + '?' + timestamp;
            }
            return profilePhoto;
        }
    }
]);