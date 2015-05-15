angular.module('core').directive('backgroundImage', function () {
    return function (scope, element, attrs) {
        attrs.$observe('backgroundImage', function (url) {
            element.css({
                'background-image': 'url(' + url + ')',
                'background-size': 'cover'
            });
        });
    };
});