'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt, {pattern: '+(grunt-contrib-*|grunt-docco)',});

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        docco: {
            debug: {
                src: ['kvsh/**/*.js'],
                options: {
                    output: 'docs/'
                }
            }
        },
        jasmine_node: {
            options: {
                forceExit: true,
                match: '.',
                matchall: false,
                extensions: 'js',
                specNameMatcher: 'spec',
                includeStackTrace: false,
                jUnit: {
                    report: true,
                    savePath: "./spec-reports/",
                    useDotNotation: true,
                    consolidate: true
                }
            },
            all: ['spec/']
        }
    });

    grunt.registerTask('docs', ['docco']);
    grunt.registerTask('test', ['jasmine_node']);
}

