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
		clientID: process.env.TWITTER_KEY || 'wawMFwa3WjYlwfj8HGf9FADeH',
		clientSecret: process.env.TWITTER_SECRET || 'ImySvm0ko3wzU9tFyXBHzZ1BGmY57Vr73gDbJfs7ph3ct0OiPF',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	}
};
