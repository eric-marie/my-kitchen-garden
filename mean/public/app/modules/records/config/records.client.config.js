'use strict';

angular.module('records').run(['Menus',
	function(Menus) {
		Menus.addMenuItem('topbar', 'Fiches', 'records', '/records(/create)?', 2, true);
	}
]);