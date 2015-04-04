module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        bump: {
            options: {
                files: ['bower.json', 'package.json'],
                updateConfigs: ['pkg'],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
            }
        },

        jsbeautifier: {
            options: {
                config: ".jsbeautifyrc"
            },
            files: [
                '**/*.js',
                '**/*.json',
                '!**/*.min.js',
                '!node_modules/**/*'
            ]
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: [
                '**/*.js',
                '**/*.json',
                '!node_modules/**/*',
            ]
        },

        mochaTest: {
            test: {
                bower: {
                    options: {
                        reporter: 'spec'
                    },
                    files: [
                        'test/**/*.js'
                    ]
                }
            }
        },

        uglify: {
            bower: {
                options: {
                    banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
                    sourceMap: true,
                    sourceMapName: 'super-stack.map'
                },
                files: {
                    'super-stack.min.js': ['super-stack.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('reloadVersion', function() {
        grunt.config.set('pkg.version', grunt.file.readJSON('package.json').version);
    });

    grunt.registerTask('format', ['jsbeautifier']);
    grunt.registerTask('majorBump', ['jsbeautifier', 'jshint', 'bump-only:major', 'reloadVersion', 'uglify', 'bump-commit']);
    grunt.registerTask('minorBump', ['jsbeautifier', 'jshint', 'bump-only:minor', 'reloadVersion', 'uglify', 'bump-commit']);
    grunt.registerTask('patchBump', ['jsbeautifier', 'jshint', 'bump-only:patch', 'reloadVersion', 'uglify', 'bump-commit']);

    grunt.registerTask('default', ['jsbeautifier', 'jshint', 'mochaTest', 'uglify']);
};
