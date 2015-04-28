module.exports = function (grunt) {
    'use strict';

    //----- Force l'utilisation du retour à la ligne d'Unix
    grunt.util.linefeed = '\n';

    //----- Configuration du projet
    grunt.initConfig({
        // Configuration des chemins de fichiers
        dirs: {
            root: './',
            dev: {
                root: '<%= dirs.root %>dev/',
                js: '<%= dirs.dev.root %>js/',
                less: '<%= dirs.dev.root %>less/',
                images: '<%= dirs.dev.root %>images/',
                ReStart: {
                    root: '<%= dirs.dev.root %>ReStart/',
                    js: '<%= dirs.dev.ReStart.root %>js/',
                    less: '<%= dirs.dev.ReStart.root %>less/',
                    images: '<%= dirs.dev.ReStart.root %>images/'
                }
            },
            vendor: '<%= dirs.root %>vendor/',
            ReStart: '<%= dirs.root %>ReStart/',
            web: {
                root: '<%= dirs.root %>web/',
                css: '<%= dirs.web.root %>css/',
                fonts: '<%= dirs.web.root %>fonts/',
                images: '<%= dirs.web.root %>images/',
                js: '<%= dirs.web.root %>js/'
            }
        },

        //----- Descriptif des différentes tâches
        // Installation des dépendences par Bower
        bower: {
            install: {}
        },
        // Copie les ressources (images, fonts, etc.) des différentes librairies dans les assets
        copy: {
            vendors: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.vendor %>flex-slider/fonts/',
                        src: ['*'],
                        dest: '<%= dirs.web.fonts %>',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= dirs.vendor %>fontawesome/fonts/',
                        src: ['*'],
                        dest: '<%= dirs.web.fonts %>',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= dirs.vendor %>bootstrap/fonts/',
                        src: ['*'],
                        dest: '<%= dirs.web.fonts %>',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= dirs.vendor %>ui-to-top/img/',
                        src: ['ui.totop.png'],
                        dest: '<%= dirs.web.images %>',
                        filter: 'isFile'
                    }
                ]
            },
            ReStart: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.dev.ReStart.images %>',
                        src: ['**'],
                        dest: '<%= dirs.web.images %>'
                    }
                ]
            },
            mkg: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.dev.images %>',
                        src: ['**'],
                        dest: '<%= dirs.web.images %>'
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
                    '<%= dirs.web.css %>main.min.css': '<%= dirs.dev.less %>mkg.less'
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
                    '<%= dirs.web.css %>main.min.css': '<%= dirs.web.css %>main.min.css'
                }
            }
        },
        // Concaténation et obfuscation des fichiers js
        uglify: {
            options: {
                preserveComments: false
            },
            libraries: {
                files: {
                    '<%= dirs.web.js %>libraries.min.js': [
                        '<%= dirs.vendor %>jquery/dist/jquery.js',
                        '<%= dirs.vendor %>bootstrap/dist/js/bootstrap.js',
                        '<%= dirs.vendor %>flex-slider/jquery.flexslider.js',
                        '<%= dirs.vendor %>ui-to-top/js/jquery.ui.totop.js',
                        '<%= dirs.vendor %>jquery.easing/js/jquery.easing.js',
                        '<%= dirs.vendor %>WOW/dist/wow.js',
                        '<%= dirs.vendor %>snap.svg/dist/snap.svg.js'
                    ]
                }
            },
            ReStart: {
                files: {
                    '<%= dirs.web.js %>ReStart.min.js': [
                        '<%= dirs.dev.ReStart.js %>flickr-images.js',
                        '<%= dirs.dev.ReStart.js %>collapse-header.js',
                        '<%= dirs.dev.ReStart.js %>flexslider.js',
                        '<%= dirs.dev.ReStart.js %>ui-to-top.js',
                        '<%= dirs.dev.ReStart.js %>wow.js',
                        '<%= dirs.dev.ReStart.js %>snap-svg.js'
                    ]
                }
            },
            mkg: {
                files: {
                    '<%= dirs.web.js %>mkg.min.js': [
                        //'<%= dirs.dev.js %>test.js'
                    ]
                }
            }
        },
        // Concatène les différents min.js entre eux
        concat: {
            options: {
                separator: ';\n'
            },
            concat: {
                src: [
                    '<%= dirs.web.js %>libraries.min.js',
                    '<%= dirs.web.js %>ReStart.min.js',
                    '<%= dirs.web.js %>mkg.min.js'
                ],
                dest: '<%= dirs.web.js %>main.min.js'
            }
        },
        // Création du js modernizr en fonction de ce qui est utilisé
        modernizr: {
            modernizr: {
                devFile: 'remote',
                outputFile: '<%= dirs.web.js %>modernizr.min.js',
                excludeFiles: [
                    '<%= dirs.web.js %>modernizr.min.js'
                ]
            }
        },
        // Ecoute la modification des fichiers js et less pour lancer les tâches associées
        watch: {
            less: {
                files: [
                    '<%= dirs.dev.less %>*.less',
                    '<%= dirs.dev.less %>*/*.less'
                ],
                tasks: [
                    'less'
                ]
            },
            js: {
                files: [
                    '<%= dirs.dev.js %>*.js',
                    '<%= dirs.dev.js %>*/*.js'
                ],
                tasks: [
                    'uglify:mkg',
                    'concat:concat'
                ]
            }
        }
    });

    //----- Charge les tâches grunt
    require('load-grunt-tasks')(grunt);

    //----- Groupement des tâches en un appel
    grunt.registerTask('default', ['bower', 'copy', 'less', 'cssmin', 'uglify', 'concat', 'modernizr']);
    grunt.registerTask('install:mkg', ['copy:mkg', 'less', 'cssmin', 'uglify:mkg', 'concat']);
    grunt.registerTask('install:ReStart', ['copy:ReStart', 'less', 'cssmin', 'uglify:ReStart', 'concat']);
};