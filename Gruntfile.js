module.exports = function (grunt) {
    'use strict';

    //----- Force l'utilisation du retour à la ligne d'Unix
    grunt.util.linefeed = '\n';

    //----- Configuration du projet
    grunt.initConfig({
        // Configuration des chemins de fichiers
        dirs: {
            root: './',
            assets: {
                root: '<%= dirs.root %>assets/',
                js: '<%= dirs.assets.root %>js/',
                less: '<%= dirs.assets.root %>less/',
                images: '<%= dirs.assets.root %>images/',
                ReStart: {
                    root: '<%= dirs.assets.root %>ReStart/',
                    js: '<%= dirs.assets.ReStart.root %>js/',
                    less: '<%= dirs.assets.ReStart.root %>less/',
                    images: '<%= dirs.assets.ReStart.root %>images/'
                }
            },
            bower_components: '<%= dirs.root %>bower_components/',
            ReStart: '<%= dirs.root %>ReStart/',
            bin: '<%= dirs.root %>bin/',
            mean: {
                root: '<%= dirs.root %>mean/',
                bin: '<%= dirs.mean.root %>bin/',
                public: {
                    root: '<%= dirs.mean.root %>public/',
                    app: '<%= dirs.mean.public.root %>app/',
                    images: '<%= dirs.mean.public.root %>images/',
                    js: '<%= dirs.mean.public.root %>js/',
                    css: '<%= dirs.mean.public.root %>css/',
                    fonts: '<%= dirs.mean.public.root %>fonts/'
                }
            }
        },

        //----- Descriptif des différentes tâches
        // Installation des dépendences par Bower
        bower: {
            install: {}
        },
        // Copie les ressources (images, fonts, etc.) des différentes librairies dans les assets
        copy: {
            bower_components: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.bower_components %>flex-slider/fonts/',
                        src: ['*'],
                        dest: '<%= dirs.mean.public.fonts %>',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= dirs.bower_components %>fontawesome/fonts/',
                        src: ['*'],
                        dest: '<%= dirs.mean.public.fonts %>',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= dirs.bower_components %>bootstrap/fonts/',
                        src: ['*'],
                        dest: '<%= dirs.mean.public.fonts %>',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= dirs.bower_components %>ui-to-top/img/',
                        src: ['ui.totop.png'],
                        dest: '<%= dirs.mean.public.images %>',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= dirs.bower_components %>marmiton-recherche-ingredient/',
                        src: 'server.js',
                        dest: '<%= dirs.mean.bin %>',
                        rename: function(dest, src) {
                            return dest + 'mri-server.js';
                        },
                        filter: 'isFile'
                    }
                ]
            },
            ReStart: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.assets.ReStart.images %>',
                        src: ['**'],
                        dest: '<%= dirs.mean.public.images %>'
                    }
                ]
            },
            mkg: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.assets.images %>',
                        src: ['**'],
                        dest: '<%= dirs.mean.public.images %>'
                    }
                ]
            }
        },
        // Compilation des fichiers less
        less: {
            compile: {
                options: {
                    compress: true
                },
                files: {
                    '<%= dirs.mean.public.css %>main.min.css': '<%= dirs.assets.less %>mkg.less'
                }
            }
        },
        // Suppression des commentaires forcés (par /*!) des librairies utilisées dans le css final
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            cssmin: {
                files: {
                    '<%= dirs.mean.public.css %>main.min.css': '<%= dirs.mean.public.css %>main.min.css'
                }
            }
        },
        // Concaténation et obfuscation des fichiers js
        uglify: {
            options: {
                preserveComments: false
            },
            bower_components: {
                files: {
                    '<%= dirs.mean.public.js %>bower_components.min.js': [
                        '<%= dirs.bower_components %>jquery/dist/jquery.js',
                        '<%= dirs.bower_components %>bootstrap/dist/js/bootstrap.js',
                        '<%= dirs.bower_components %>flex-slider/jquery.flexslider.js',
                        '<%= dirs.bower_components %>ui-to-top/js/jquery.ui.totop.js',
                        '<%= dirs.bower_components %>jquery.easing/js/jquery.easing.js',
                        '<%= dirs.bower_components %>WOW/dist/wow.js',
                        '<%= dirs.bower_components %>snap.svg/dist/snap.svg.js'
                    ]
                }
            },
            angular: {
                files: {
                    '<%= dirs.mean.public.js %>angular.min.js': [
                        '<%= dirs.bower_components %>angular/angular.min.js',
                        '<%= dirs.bower_components %>angular-resource/angular-resource.min.js',
                        '<%= dirs.bower_components %>angular-cookies/angular-cookies.min.js',
                        '<%= dirs.bower_components %>angular-animate/angular-animate.min.js',
                        '<%= dirs.bower_components %>angular-touch/angular-touch.min.js',
                        '<%= dirs.bower_components %>angular-sanitize/angular-sanitize.min.js',
                        '<%= dirs.bower_components %>angular-ui-router/release/angular-ui-router.min.js',
                        '<%= dirs.bower_components %>angular-ui-utils/ui-utils.min.js',
                        '<%= dirs.bower_components %>angular-bootstrap/ui-bootstrap-tpls.min.js',
                        '<%= dirs.bower_components %>angular-loading-bar/build/loading-bar.js'
                    ]
                }
            },
            ReStart: {
                files: {
                    '<%= dirs.mean.public.js %>ReStart.min.js': [
                        '<%= dirs.assets.ReStart.js %>flickr-images.js',
                        '<%= dirs.assets.ReStart.js %>collapse-header.js',
                        '<%= dirs.assets.ReStart.js %>flexslider.js',
                        '<%= dirs.assets.ReStart.js %>ui-to-top.js',
                        '<%= dirs.assets.ReStart.js %>wow.js',
                        '<%= dirs.assets.ReStart.js %>snap-svg.js'
                    ]
                }
            },
            mkg: {
                files: {
                    '<%= dirs.mean.public.js %>mkg.min.js': [
                        //'<%= dirs.assets.js %>test.js'
                    ]
                }
            },
            angularApp: {
                files: {
                    '<%= dirs.mean.public.js %>angular-app.min.js': [
                        '<%= dirs.mean.public.app %>config.js',
                        '<%= dirs.mean.public.app %>application.js',
                        '<%= dirs.mean.public.app %>**/*.client.module.js',
                        '<%= dirs.mean.public.app %>**/config/*.js',
                        '<%= dirs.mean.public.app %>**/controllers/*.js',
                        '<%= dirs.mean.public.app %>**/services/*.js',
                        '<%= dirs.mean.public.app %>**/config/*.js'
                    ]
                }
            }
        },
        // Concatène les différents min.js entre eux
        concat: {
            options: {
                separator: ';\n'
            },
            main: {
                src: [
                    '<%= dirs.mean.public.js %>modernizr.min.js',
                    '<%= dirs.mean.public.js %>bower_components.min.js',
                    '<%= dirs.mean.public.js %>angular.min.js',
                    '<%= dirs.mean.public.js %>ReStart.min.js',
                    '<%= dirs.mean.public.js %>mkg.min.js'
                ],
                dest: '<%= dirs.mean.public.js %>main.min.js'
            }
        },
        // Création du js modernizr en fonction de ce qui est utilisé
        modernizr: {
            modernizr: {
                devFile: 'remote',
                outputFile: '<%= dirs.mean.public.js %>modernizr.min.js',
                excludeFiles: [
                    '<%= dirs.mean.public.js %>modernizr.min.js'
                ]
            }
        },
        // Ecoute la modification des fichiers js et less pour lancer les tâches associées
        watch: {
            less: {
                files: [
                    '<%= dirs.assets.less %>*.less',
                    '<%= dirs.assets.less %>*/*.less',
                    '<%= dirs.assets.ReStart.less %>*.less',
                    '<%= dirs.assets.ReStart.less %>*/*.less'
                ],
                tasks: [
                    'less'
                ]
            },
            js: {
                files: [
                    '<%= dirs.assets.js %>*.js',
                    '<%= dirs.assets.js %>**/*.js'
                ],
                tasks: [
                    'uglify:mkg',
                    'concat:concat'
                ]
            },
            angularApp: {
                files: [
                    '<%= dirs.mean.public.app %>*.js',
                    '<%= dirs.mean.public.app %>**/*.js'
                ],
                tasks: [
                    'uglify:angularApp'
                ]
            }
        }
    });

    //----- Charge les tâches grunt
    require('load-grunt-tasks')(grunt);

    //----- Groupement des tâches en un appel
    grunt.registerTask('default', ['bower', 'modernizr', 'copy', 'less', 'cssmin', 'uglify', 'concat']);
    grunt.registerTask('watch Angular application', ['watch:angularApp']);
    grunt.registerTask('install:mkg', ['copy:mkg', 'less', 'cssmin', 'uglify:mkg', 'concat']);
    grunt.registerTask('install:ReStart', ['copy:ReStart', 'less', 'cssmin', 'uglify:ReStart', 'concat']);
};