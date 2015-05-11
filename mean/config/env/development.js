'use strict';

module.exports = {
	db: 'mongodb://localhost/mkg-dev',
	app: {
		title: 'My Kitchen Garden - Dev...'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '1659328634300477',
		clientSecret: process.env.FACEBOOK_SECRET || 'a32d300f84b79b2c5ccd6befa21e644e',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	}
};
