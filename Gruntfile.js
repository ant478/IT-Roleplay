const webpackConfig = require('./config/webpack.config.js');

module.exports = function init(grunt) {
  grunt.initConfig({
    eslint: {
      backend: {
        options: {
          configFile: '.eslintrc',
          failOnError: false,
        },
        src: [
          '**/*.js', '**/*.json',
          '!node_modules/**/*', '!frontend/**/*',
        ],
      },
      frontend: {
        options: {
          configFile: 'frontend/.eslintrc',
          failOnError: false,
        },
        src: [
          'frontend/**/*.js', 'frontend/**/*.json', 'frontend/**/*.jsx',
          '!frontend/**/build/**/*',
        ],
      },
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
            NODE_ENV: 'development',
          },
          watch: [
            'app.js',
            'src/**/*',
            'config/**/*',
          ],
          delay: 1000,
          exec: './node_modules/.bin/grunt eslint:backend && node',
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('lint', ['eslint:backend', 'eslint:frontend']);
  grunt.registerTask('build', ['webpack']);
};
