'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	validation = require('./validation.server.model');

/**
 * Discussion Schema
 */
var DiscussionSchema = new Schema({
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
    description: {
        type: String,
        default: '',
        trim: true
    },
    category: {
        type: [{
            type: String,
            enum: [ 'Mon potager', 'Astuces du jardin', 'Recettes', 'Echange de semances', 'Détente' ]
        }],
        default: ['Technique']
    },
	name: {
		type: String,
		default: '',
		trim: true, 	
		unique : true,
		required: 'name cannot be blank',
		validate: [validation.len(50), 'name must be 15 chars in length or less']
	},
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

mongoose.model('Discussion', DiscussionSchema);
