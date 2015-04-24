var tests = {
  'main': require('./tests/test_main.js'),
  'markov': require('./tests/test_markov.js')
};

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['Gruntfile.js', './*.js', 'tests/*.js'],
      options: {
        esnext: true,
        node: true,
        globals: {'require': true, 'module': true, 'console': true }
      }
    }
  });

  // Load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);

};