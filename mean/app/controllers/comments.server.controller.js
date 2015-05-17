'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Comment = mongoose.model('Comment'),
    fs = require('fs'),
    config = require('../../config/config'),
    _ = require('lodash');

var crud = function() {
    var CommentModel = mongoose.model('Comment');

    return {
        create: function(req, res) {
            var model = new CommentModel(req.body);
            model.author = req.user;

            model.save(function(err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    for(var parentModelKey in req.model) {
                        if(req.model.hasOwnProperty(parentModelKey)) {
                            var parentModel = req.model[parentModelKey];
                            parentModel.comments.push(model);
                            parentModel.save(function() {
                                if (err) {
                                    return res.status(400).send({
                                        message: errorHandler.getErrorMessage(err)
                                    });
                                } else {
                                    res.status(201).json(model);
                                }
                            });
                        }
                    }
                }
            });
        },
        delete: function(req, res) {
            var model = req.model['Comment'];

            model.remove(function(err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    for(var parentModelKey in req.model) {
                        if(req.model.hasOwnProperty(parentModelKey)) {
                            if('Comment' != parentModelKey) {
                                var parentModel = req.model[parentModelKey];
                                if(parentModel.comments) {
                                    var index = parentModel.comments.indexOf(model._id);
                                    if(0 <= index) {
                                        parentModel.comments.splice(index, 1);
                                    }
                                }
                                parentModel.save(function() {
                                    if (err) {
                                        return res.status(400).send({
                                            message: errorHandler.getErrorMessage(err)
                                        });
                                    } else {
                                        res.json(model);
                                    }
                                });
                            }
                        }
                    }
                }
            });
        },
        list: function(req, res) {
            var query = {};
            if (req.query.filter) {
                query = req.query.filter;
            }

            CommentModel
                .find(query)
                .populate('author', '-firstName -lastName -email -username -password -salt -provider -providerData -additionalProvidersData -roles -updated -created -resetPasswordToken -resetPasswordExpires')
                .sort([['created', 'descending']])
                .exec(function(err, models) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        res.json(models);
                    }
                });
        },
        getByID: function(req, res, next, id) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send({
                    message: 'Comment is invalid'
                });
            }

            CommentModel.findById(id).exec(function(err, model) {
                if (err) return next(err);
                if (!model) {
                    return res.status(404).send({
                        message: 'Comment not found'
                    });
                }
                req.model = req.model || {};
                req.model['Comment'] = model;
                next();
            });
        }
    };
};

module.exports = crud();