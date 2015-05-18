'use strict';

module.exports = function (app) {
    var discussions = require('../controllers/discussions.server.controller'),
        users = require('../controllers/users.server.controller'),
        apiAuth = require('../controllers/api.authorization.server.controller');

    app.route('/discussions')
        .get(apiAuth, discussions.list)
        .post(apiAuth, users.hasAuthorization(['user']), discussions.create);

    app.route('/discussions/statistics')
        .get(apiAuth, discussions.categoryStats);

    app.route('/discussions/:discussionId')
        .get(apiAuth, discussions.read)
        .put(apiAuth, users.hasAuthorization(['user']), discussions.update)
        .delete(apiAuth, users.hasAuthorization(['admin']), discussions.delete);

    // Finish by binding the discussion middleware
    app.param('discussionId', discussions.getByID);
};
