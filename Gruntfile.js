module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      build: {
        files: [
          { src: 'src/index.html', dest: 'build/index.html' },
          // { src: '../yafgs/css/yafgs.max.css', dest: 'build/css/yafgs.max.css' },
          {expand: true, cwd: 'src/', src: ['js/**'], dest: 'build/'},
          {expand: true, cwd: 'src/', src: ['font/**'], dest: 'build/'},
          {expand: true, cwd: 'src/', src: ['coderdojo/**'], dest: 'build/'},
          {expand: true, cwd: 'src/', src: ['imgs/**'], dest: 'build/'}
        ]
      },
    },
    sass: {
      options: {
        style: 'compressed',
        sourcemap: 'none'
      },
      build: {
        files: {
          'build/css/style.min.css': 'src/sass/style.scss'
        }
      }
    },
    connect: {
      server: {
        options: {
          keepalive: true,
          hostname: 'localhost',
          port: 4000,
          base: 'build/',
          open: true
        }
      }
    },
    clean: {
      build: {
        src: ['build/']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('build',
    [
      'clean:build',
      'sass:build',
      'copy:build'
    ]);
  grunt.registerTask('default',
    [
      'build'
    ]);
  grunt.registerTask('serve',
    [
      'build',
      'connect'
    ]);
};