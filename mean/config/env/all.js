'use strict';

module.exports = {
	app: {
		title: 'My Kitchen Garden',
		description: 'Managing a kitchen garden as a SAAS'
	},
	port: process.env.PORT || 1337,
	templateEngine: 'swig',
	sessionSecret: 'mk6-1n-4-m34n-574ck-w17h-l337-5p34k',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/css/main.min.css'
			],
			js: [
				'public/js/main.min.js'
			]
		},
		css: [
			'public/app/modules/**/css/*.css'
		],
		js: [
			'public/app/config.js',
			'public/app/application.js',
			'public/app/modules/*/*.js',
			'public/app/modules/**/*.js'
		]
	},
    mailer: {
        from: process.env.MAILER_FROM || 'my.kit.gar@gmail.com',
        options: {
            service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
            auth: {
                user: process.env.MAILER_EMAIL_ID || 'my.kit.gar@gmail.com',
                pass: process.env.MAILER_PASSWORD || 'my-kitchen-garden'
            }
        }
    }
};