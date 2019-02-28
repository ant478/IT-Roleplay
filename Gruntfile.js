const webpackConfig = require('./config/webpack.config.js');

module.exports = function init(grunt) {
  grunt.initConfig({
    eslint: {
      options: {
        configFile: 'config/eslint.json',
      },
      target: [
        '*.js', 'src/**/*.js', 'routes/**/*.js', 'migrations/**/*.js',
        '*.json', 'config/**/*.json',
      ],
    },

    webpack: {
      myConfig: webpackConfig,
    },

    copy: {
      index: {
        files: [{
          expand: true,
          flatten: true,
          src: 'frontend/index.html',
          dest: 'frontend/build/',
          filter: 'isFile',
        }],
      },
    },
  });

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('build', ['copy:index', 'webpack']);
};
