'use strict';

angular.module('users').service('Roles', [
    function() {
        this.isAdmin = function(user) {
            return user && user.roles && 0 <= user.roles.indexOf('admin');
        }
        this.isUser = function(user) {
            return user && user.roles && 0 <= user.roles.indexOf('user');
        }
    }
]);