var config = {
  dist: 'dist',
  node_modules: 'node_modules',
  src: 'src',
  banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - Copyright 2015 <%= pkg.author %> */\n'
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
            cwd: '<%= config.node_modules %>/octicons/octicons',
            src: 'octicons.ttf',
            dest: '<%= config.dist %>/octicons'
          },
          {
            expand: true,
            cwd: '<%= config.node_modules %>/octicons/octicons',
            src: 'octicons.woff',
            dest: '<%= config.dist %>/octicons'
          },
          {
            expand: true,
            cwd: '<%= config.node_modules %>/octicons/octicons',
            src: 'octicons.eot',
            dest: '<%= config.dist %>/octicons'
          },
          {
            expand: true,
            cwd: '<%= config.node_modules %>/octicons/octicons',
            src: 'octicons.svg',
            dest: '<%= config.dist %>/octicons'
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
          '<%= config.dist %>/github-activity-<%= pkg.version %>.min.css': [
            '<%= config.src %>/github-activity.css'
          ],
          '<%= config.dist %>/octicons/octicons.min.css': [
            '<%= config.node_modules %>/octicons/octicons/octicons.css'
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
          '<%= config.dist %>/github-activity-<%= pkg.version %>.min.js': [
            '<%= config.src %>/github-activity.js'
          ],
          '<%= config.dist %>/mustache/mustache.min.js': [
            '<%= config.node_modules %>/mustache/mustache.js'
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