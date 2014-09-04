// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'src/libs/jquery/dist/jquery.min.js',
            'src/js/**/*.js',
            'test/unit/**/*.js'
        ],

        // list of files / patterns to exclude
        exclude: [],

        reporters: ['progress', 'junit', 'coverage'],

        // ngHtml2JsPreprocessor: {
        //     // strip this from the file path
        //     stripPrefix: 'app/'
        // },

        preprocessors: {
            'src/js/**/*.js': ['coverage']
            // 'app/views/**/*.html': ['ng-html2js']
        },

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        junitReporter: {
            // will be resolved to basePath (in the same way as files/exclude patterns)
            outputFile: 'js-unit-test-results.xml'
        },


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,

        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        }
    });
};
