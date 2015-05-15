'use strict';

angular.module('record').run(['Menus',
	function(Menus) {
		Menus.addMenuItem('topbar', 'Fiches', 'record', '/record(/create)?', 2, true);
	}
]);