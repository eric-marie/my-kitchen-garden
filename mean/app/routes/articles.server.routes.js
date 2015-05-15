'use strict';

module.exports = function (app) {
    var articles = require('../controllers/articles.server.controller'),
        users = require('../controllers/users.server.controller'),
        apiAuth = require('../controllers/api.authorization.server.controller'),
        multiparty = require('connect-multiparty'),
        multipartyMiddleware = multiparty();

    app.route('/articles')
        .get(apiAuth, articles.list)
        .post(apiAuth, users.hasAuthorization(['admin']), articles.create);

    app.route('/articles/:articleId')
        .get(apiAuth, articles.read)
        .put(apiAuth, users.hasAuthorization(['admin']), articles.update)
        .delete(apiAuth, users.hasAuthorization(['admin']), articles.delete);

    // Finish by binding the article middleware
    app.param('articleId', articles.getByID);
};
