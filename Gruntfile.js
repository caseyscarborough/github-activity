var config = {
  dist: 'dist',
  bower: 'bower_components',
  src: 'src',
  banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - Copyright 2014 <%= pkg.author %> */\n'
};

var pkg = require('./package.json');

module.exports = function(grunt) {
  grunt.initConfig({
    config: config,
    pkg: pkg,
    copy: {
      dist: {
        files: [{
            expand: true,
            cwd: '<%= config.bower %>/font-awesome',
            src: 'fonts/*',
            dest: '<%= config.dist %>'
          }, {
            expand: true,
            cwd: '<%= config.bower %>/font-awesome/css',
            src: 'font-awesome.min.css',
            dest: '<%= config.dist %>/css'
          }
        ]
      }
    },
    cssmin: {
      add_banner: {
        options: {
          banner: config.banner
        },
        files: {
          '<%= config.dist %>/css/github-activity.min.css': [
            '<%= config.src %>/github-activity.css'
          ]
        }
      }
    },
    uglify: {
      options: {
        banner: config.banner
      },
      dist: {
        files: {
          '<%= config.dist %>/js/github-activity.min.js': [
            '<%= config.bower %>/mustache/mustache.js',
            '<%= config.src %>/github-activity.js'
          ]
        }
      }
    },
    clean: {
      build: {
        src: ["dist/*"]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask( "wipe", [ "clean" ])
  grunt.registerTask( "default", [ "copy", "cssmin", "uglify:dist" ] );
};