'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Record = mongoose.model('Record'),
    fs = require('fs'),
    config = require('../../config/config'),
    _ = require('lodash');

var crud = require('./crud.server.controller')('Record', 'name');

var toExpose = crud;

/**
 * Add a profile photo
 */
toExpose.uploadPhoto = function (req, res) {
    var publicDir = __dirname.replace('app/controllers', 'public'),
        uploadDir = publicDir + config.uploadDir.recordPhoto,
        file = req.files.file;
    var nameParts = file.originalFilename.split('.');
    var fileExtension = nameParts[nameParts.length - 1];
    var fileName = Math.round((Math.pow(36, 31) - Math.random() * Math.pow(36, 30))).toString(36).slice(1);

    fs.readFile(file.path, function (err, data) {
        fs.writeFile(uploadDir + fileName + '.' + fileExtension, data, function (err) {
            fs.unlink(file.path, function () {});

            if (err) {
                res.status(400).send({
                    message: 'Fail to upload'
                });
            } else {
                return res.send({
                    message: 'File correctly uploaded',
                    filename: fileName + '.' + fileExtension
                });
            }
        });
    });
};

/**
 * Remove the profile photo
 */
toExpose.deletePhoto = function (req, res, next) {
    var deletePhoto = function() {
        var publicDir = __dirname.replace('app/controllers', 'public'),
            uploadDir = publicDir + config.uploadDir.recordPhoto;
        fs.unlink(uploadDir + req.model['Record'].recordPhoto, function (err) {
            next();
        });
    };

    if(req.model['Record'].recordPhoto) {
        if(req.body.recordPhoto && req.body.recordPhoto == req.model['Record'].recordPhoto) {
            next();
        } else {
            deletePhoto();
        }
    } else {
        next();
    }
};

module.exports = toExpose;