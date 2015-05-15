'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	validation = require('./validation.server.model');

/**
 * Record Schema
 */
var RecordSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
    description: {
        type: String,
        default: '',
        trim: true
    },
    recordPhoto: {
        type: String,
        default: '',
        trim: true
    },
    category: {
        type: [{
            type: String,
            enum: ['Légume', 'Fruit']
        }],
        default: ['Légume']
    },
	name: {
		type: String,
		default: '',
		trim: true, 	
		unique : true,
		required: 'name cannot be blank',
		validate: [validation.len(15), 'name must be 15 chars in length or less']
	}
});

mongoose.model('Record', RecordSchema);
