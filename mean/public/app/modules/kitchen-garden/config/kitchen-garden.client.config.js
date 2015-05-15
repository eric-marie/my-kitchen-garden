'use strict';

angular.module('kitchen-garden').run(['Menus',
	function(Menus) {
		Menus.addMenuItem('topbar', 'Mon potager', 'kitchen-garden', '/kitchen-garden', 0);
	}
]);