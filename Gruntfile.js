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
  });

  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('lint', ['eslint']);
};
