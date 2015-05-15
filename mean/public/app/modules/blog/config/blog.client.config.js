'use strict';

angular.module('blog').run(['Menus',
	function(Menus) {
		Menus.addMenuItem('topbar', 'Blog', 'blog', '/blog(/create)?', 3, true);
	}
]);