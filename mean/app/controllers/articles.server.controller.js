'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Article = mongoose.model('Article'),
    fs = require('fs'),
    config = require('../../config/config'),
    _ = require('lodash');

var crud = require('./crud.server.controller')('Article', 'name');

var toExpose = crud;

module.exports = toExpose;