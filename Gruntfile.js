const webpackConfig = require('./config/webpack.config.js');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = function init(grunt) {
  grunt.initConfig({
    eslint: {
      options: {
        failOnError: false,
      },
      src: [
        '**/*.js', '**/*.json', '**/*.jsx',
        '!frontend/**/build/**/*', '!node_modules/**/*',
      ],
    },

    webpack: {
      myConfig: Object.assign(webpackConfig, {
        watch: !!grunt.option('watch'),
      }),
    },

    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          env: {
            NODE_ENV: process.env.NODE_ENV,
          },
          watch: [
            './app.js',
            './src/**/*',
            './config/**/*',
            './frontend/**/build/**/*',
          ],
          delay: 1000,
          exec: devMode ? 'grunt eslint && node' : undefined,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('build', ['webpack']);
};
