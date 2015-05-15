'use strict';

angular.module('core').service('ProfilePhoto', [
    function() {
        this.getProfilePhoto = function(user) {
            var profilePhoto = '/images/logo.png';
            if(user && user.profilePhoto) {
                profilePhoto = '/images/upload/' + user._id + '.' + user.profilePhoto + '?' + Date.now();
            }
            return profilePhoto;
        }
    }
]);