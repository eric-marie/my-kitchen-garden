'use strict';

module.exports = function (app) {
    var comments = require('../controllers/comments.server.controller'),
        users = require('../controllers/users.server.controller'),
        apiAuth = require('../controllers/api.authorization.server.controller');

    // Singulier: Pluriel
    var moduleList = {
        'article': 'articles'
    };
    for(var key in moduleList) {
        if(moduleList.hasOwnProperty(key)) {
            var moduleController = require('../controllers/' + moduleList[key] + '.server.controller');

            app.route('/comments/' + moduleList[key] + '/:' + key + 'Id')
                .get(apiAuth, comments.list)
                .post(apiAuth, users.requiresLogin, comments.create);

            app.route('/comments/' + moduleList[key] + '/:' + key + 'Id' + '/:commentId')
                .delete(apiAuth, users.hasAuthorization(['admin']), comments.delete);

            app.param(key + 'Id', moduleController.getByID);
        }
    }

    app.param('commentId', comments.getByID);
};
