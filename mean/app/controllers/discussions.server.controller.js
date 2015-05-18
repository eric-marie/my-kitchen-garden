'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Discussion = mongoose.model('Discussion'),
    fs = require('fs'),
    config = require('../../config/config'),
    _ = require('lodash');

var crud = require('./crud.server.controller')('Discussion', 'name');

crud.categoryStats = function (req, res) {
    var Model = mongoose.model('Discussion');
    var agg = [
        {
            $group: {
                _id: "$category",
                total: {$sum: 1}
            }
        }
    ];

    Model.aggregate(agg, function (err, categories) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            var populateCategories = function(categories, categoriesFinal) {
                var length = categories.length;
                if(0 < length) {
                    var category = categories.pop();
                    Model.find({category: category._id})
                        .populate('author', '-firstName -lastName -email -username -password -salt -provider -providerData -additionalProvidersData -roles -updated -created -resetPasswordToken -resetPasswordExpires')
                        .sort({'created': -1})
                        .limit(1)
                        .exec(function(err, discussion) {
                            if (err) {
                                return res.status(400).send({
                                    message: errorHandler.getErrorMessage(err)
                                });
                            } else {
                                category.lastDiscussion = discussion;
                                categoriesFinal.push(category);
                                populateCategories(categories, categoriesFinal);
                            }
                        });
                } else {
                    res.json(categoriesFinal);
                }
            };
            populateCategories(categories, []);
        }
    });
};

module.exports = crud;