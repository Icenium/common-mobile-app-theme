'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                src: 'sass/theme.scss',
                dest: 'styles/theme.css'
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer-core')({
                        browsers: 'last 2 versions'
                    })
                ]
            },
            dist: {
                src: 'styles/theme.css'
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            dist: {
                src: 'styles/theme.css',
                dest: 'styles/theme.min.css'
            }
        },
        watch: {
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['sass', 'postcss', 'cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('styles', ['sass', 'postcss', 'cssmin']);
    grunt.registerTask('styles-watch', ['styles', 'watch']);

    grunt.registerTask('default', ['styles']);
};
