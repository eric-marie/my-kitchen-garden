'use strict';

angular.module('forum').run(['Menus',
	function(Menus) {
		Menus.addMenuItem('topbar', 'Forum', 'forum', '/forum(/create)?', 4, true);
	}
]);