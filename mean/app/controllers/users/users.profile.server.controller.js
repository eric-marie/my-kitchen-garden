'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../errors.server.controller.js'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    fs = require('fs'),
    config = require('../../../config/config'),
    User = mongoose.model('User');

var saveUser = function(user, req, res) {
    user.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            req.login(user, function (err) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.json(user);
                }
            });
        }
    });
};

/**
 * Update user details
 */
exports.update = function (req, res) {
    // Init Variables
    var user = req.user;

    // For security measurement we remove the roles from the req.body object
    delete req.body.roles;

    if (user) {
        // Profile's photo upload
        if (req.files) {
            var publicDir = __dirname.replace('app/controllers/users', 'public'),
                uploadDir = publicDir + config.uploadDir,
                file = req.files.file;
            var nameParts = file.originalFilename.split('.');
            var fileExtension = nameParts[nameParts.length - 1];
            if (user.profilePhoto) { // Delete old photo
                fs.unlink(uploadDir + user._id + '.' + user.profilePhoto, function () {});
            }
            fs.readFile(file.path, function (err, data) {
                fs.writeFile(uploadDir + user._id + '.' + fileExtension, data, function () {
                    fs.unlink(file.path, function () {});
                });
            });
            user.profilePhoto = fileExtension;
        }

        // Merge existing user
        user = _.extend(user, req.body);
        user.displayName = user.firstName + ' ' + user.lastName;
        user.updated = Date.now();

        saveUser(user, req, res);
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};

/**
 * Add a profile photo
 */
exports.uploadPhoto = function (req, res) {
    // Init Variables
    var user = req.user;

    if (user) {
        var publicDir = __dirname.replace('app/controllers/users', 'public'),
            uploadDir = publicDir + config.uploadDir,
            file = req.files.file;
        var nameParts = file.originalFilename.split('.');
        var fileExtension = nameParts[nameParts.length - 1];
        if (user.profilePhoto) { // Delete old photo
            fs.unlink(uploadDir + user._id + '.' + user.profilePhoto, function () {});
        }
        fs.readFile(file.path, function (err, data) {
            fs.writeFile(uploadDir + user._id + '.' + fileExtension, data, function () {
                fs.unlink(file.path, function () {});
            });
        });

        user.profilePhoto = fileExtension;
        user.updated = Date.now();

        saveUser(user, req, res);
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};

/**
 * Remove the profile photo
 */
exports.deletePhoto = function (req, res) {
    // Init Variables
    var user = req.user;

    if (user) {
        if (user.profilePhoto) {
            var publicDir = __dirname.replace('app/controllers/users', 'public'),
                uploadDir = publicDir + config.uploadDir;
            fs.unlink(uploadDir + user._id + '.' + user.profilePhoto, function () {});

            user.profilePhoto = undefined;
        }

        saveUser(user, req, res);
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};

/**
 * Send User
 */
exports.me = function (req, res) {
    res.json(req.user || null);
};