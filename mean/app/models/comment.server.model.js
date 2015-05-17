'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validation = require('./validation.server.model');

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        default: '',
        trim: true
    }
});

mongoose.model('Comment', CommentSchema);