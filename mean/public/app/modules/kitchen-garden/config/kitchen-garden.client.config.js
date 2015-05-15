'use strict';

angular.module('blog').run(['Menus',
	function(Menus) {
		Menus.addMenuItem('topbar', 'Mon potager', 'kitchen-garden', '/kitchen-garden', 0);
	}
]);