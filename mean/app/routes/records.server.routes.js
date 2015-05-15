'use strict';

module.exports = function (app) {
    var records = require('../controllers/records.server.controller'),
        users = require('../controllers/users.server.controller'),
        apiAuth = require('../controllers/api.authorization.server.controller'),
        multiparty = require('connect-multiparty'),
        multipartyMiddleware = multiparty();

    app.route('/records')
        .get(apiAuth, records.list)
        .post(apiAuth, users.hasAuthorization(['admin']), records.create);

    app.route('/records/:recordId')
        .get(apiAuth, records.read)
        .put(apiAuth, users.hasAuthorization(['admin']), records.deletePhoto, records.update)
        .delete(apiAuth, users.hasAuthorization(['admin']), records.deletePhoto, records.delete);

    app.route('/records/upload-photo')
        .post(multipartyMiddleware, users.hasAuthorization(['admin']), records.uploadPhoto);

    // Finish by binding the article middleware
    app.param('recordId', records.getByID);
};
