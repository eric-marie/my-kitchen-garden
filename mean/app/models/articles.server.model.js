'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	validation = require('./validation.server.model');

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
    description: {
        type: String,
        default: '',
        trim: true
    },
    category: {
        type: [{
            type: String,
            enum: ['Technique', 'Annonce', 'Calendrier', 'Bien débuter', 'Matériel']
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
	}
});

mongoose.model('Article', ArticleSchema);
