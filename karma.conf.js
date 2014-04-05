
module.exports = function(config) {

    'use strict';

    config.set({
        files: [
            'taby.js',
            'tests/*.js'
        ],
        basePath: './',
        frameworks: ['jasmine'],
        browser : ['Chrome', 'Firefox', 'Safari', 'Opera', 'IE', 'PhantomJS'],
        exclude : [],
        reporters : ['progress'],
        junitReporter : {
            outputFile: 'test-results.xml'
        },
        port : 9876,
        runnerPort : 9100,
        colors : true,
        logLevel : config.LOG_INFO,
        autoWatch : true,
        captureTimeout : 5000,
        singleRun : false,
        reportSlowerThan : 500
    });

};