// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const path = require('path')
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular', 'pact'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('@pact-foundation/karma-pact')
    ],
    files: [
      'node_modules/@pact-foundation/pact-web/pact-web.js'
    ],
    pact: [{
      port: 1234,
      consumer: 'Angular',
      provider: 'BFF',
      logLevel: 'DEBUG',
      log: path.resolve(process.cwd(), 'pacts/logs', 'pact.log'),
      dir: path.resolve(process.cwd(), 'pacts'),
      pactfileWriteMode:"overwrite"
    }],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/learning-agular'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
