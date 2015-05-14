'use strict';

var errorHandler = require('./errors.server.controller'),
    nodemailer = require('nodemailer'),
    async = require('async'),
    config = require('../../config/config');

exports.submit = function(req, res, next) {
    async.waterfall([
        function(done) {
            if (!req.body.name || !req.body.email || !req.body.subject || !req.body.message) {
                return res.status(400).send({
                    message: 'Tous les champs doivent être renseignés avant de pouvoir soumettre le formulaire.'
                });
            } else {
                done(false, req.body.name, req.body.email, req.body.subject, req.body.message);
            }
        },
        function(name, email, subject, message, done) {
            res.render('templates/contact-form', {
                name: name,
                email: email,
                subject: subject,
                message: message,
                appName: config.app.title
            }, function(err, emailHTML) {
                done(err, emailHTML);
            });
        },
        function(emailHTML, done) {
            var smtpTransport = nodemailer.createTransport(config.mailer.options);
            var mailOptions = {
                to: config.mailer.contact,
                from: config.mailer.from,
                subject: 'Formulaire de contact',
                html: emailHTML
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                if (!err) {
                    res.send({ message: 'Le message a bien été envoyé.' });
                }

                done(err);
            });
        }
    ], function(err) {
        if (err) {
            return next(err);
        }
    });
};