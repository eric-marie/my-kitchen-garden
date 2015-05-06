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
            vendor: '<%= dirs.root %>vendor/',
            ReStart: '<%= dirs.root %>ReStart/',
            bin: '<%= dirs.root %>bin/',
            web: {
                root: '<%= dirs.root %>web/',
                css: '<%= dirs.web.root %>css/',
                fonts: '<%= dirs.web.root %>fonts/',
                images: '<%= dirs.web.root %>images/',
                js: '<%= dirs.web.root %>js/'
            },
            mean: {
                root: '<%= dirs.root %>mean/',
                bin: '<%= dirs.mean.root %>bin/',
                public: {
                    root: '<%= dirs.mean.root %>public/',
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
            vendors: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= dirs.vendor %>flex-slider/fonts/',
                        src: ['*'],
                        dest: '<%= dirs.mean.public.fonts %>',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= dirs.vendor %>fontawesome/fonts/',
                        src: ['*'],
                        dest: '<%= dirs.mean.public.fonts %>',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= dirs.vendor %>bootstrap/fonts/',
                        src: ['*'],
                        dest: '<%= dirs.mean.public.fonts %>',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= dirs.vendor %>ui-to-top/img/',
                        src: ['ui.totop.png'],
                        dest: '<%= dirs.mean.public.images %>',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= dirs.vendor %>marmiton-recherche-ingredient/',
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
                    '<%= dirs.mean.public.css %>main.min.css': '<%= dirs.web.css %>main.min.css'
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
                    '<%= dirs.mean.public.js %>libraries.min.js': [
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
                    '<%= dirs.assets.js %>*/*.js'
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
    grunt.registerTask('watch', ['watch']);
    grunt.registerTask('install:mkg', ['copy:mkg', 'less', 'cssmin', 'uglify:mkg', 'concat']);
    grunt.registerTask('install:ReStart', ['copy:ReStart', 'less', 'cssmin', 'uglify:ReStart', 'concat']);
};