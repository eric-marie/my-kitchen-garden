'use strict';

module.exports = function(app) {
    var contact = require('../../app/controllers/contact.server.controller');
    app.route('/contact/submit').post(contact.submit);
};