/*jslint
    white */
/* global
  grunt */
module.exports = function (grunt) {
  'use script';

  // Configs
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      build: {
        files: [
          {expand: true, cwd: 'src/', src: ['fonts/**'], dest: 'build/'},
          {expand: true, cwd: 'src/', src: ['*.txt', 'favicon.ico'], dest: 'build/'}
        ]
      }
    },
    sass: {
      build: {
        options: {
          implementation: 'sass',
          style: 'compressed',
          sourcemap: 'none'
        },
        files:  [
          {
            expand: true,
            cwd: 'src/sass',
            src: ['**/*.scss', "!libs/*.scss", "!components/*.scss"],
            dest: 'build/css',
            ext: '.css'
          }
        ]
      }
    },
    connect: {
      server: {
        options: {
          // keepalive: true,
          hostname: 'localhost',
          port: 4000,
          base: 'build/',
          livereload: true
          // open: true
        }
      }
    },
    pug: {
      build: {
        options: {
          pretty: false
        },
        files: [
          {
            cwd: "src",
            src: ["**/*.pug", "!templates/**/*.pug"],
            dest: "build",
            expand: true,
            ext: ".html"
          }
        ]
      }
    },
    clean: {
      build: {
        src: ['build/']
      }
    },
    watch: {
      options: { livereload: true },
      files: ['src/**/*.pug', 'src/**/*.js', 'src/**/*.scss'],
      tasks: ['build']
    },
    processhtml: {
      build: {
        options: {
          process: true,
          data: {
            sitetitle: 'Harry McKillen'
          }
        },
        files: [
          {expand: true, cwd: 'build/', src: ['*.html'], dest: 'build/'}
        ]
      }
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-ftp-push');
  grunt.loadNpmTasks('grunt-contrib-pug');

  // Registered Tasks
  grunt.registerTask('build',
    [
      'clean:build',
      'sass:build',
      'copy:build',
      'pug:build'
    ]);
  grunt.registerTask('wipe',
    [
      'clean:build'
    ]);
  grunt.registerTask('default',
    [
      'build'
    ]);
  grunt.registerTask('serve', 'Serve the file from connect, or local apache', function (){

    if(grunt.option('local')){
      //builds to /build folder, from which apache serves it
      grunt.task.run([
        'build',
        'watch'
      ]);
    } else {
      // if apache not running locally, serves from localhost:4000
      grunt.task.run([
        'build',
        'connect',
        'watch'
      ]);
    }

  });

  // FTP transfer task
  grunt.registerTask('deploy', 'A simple task that ftp\'s stuff.', function (target){

    var hosts = grunt.file.readJSON('hosts.json'),
        env_host,
        env_remotedir,
        env_authkey;

    if(target === 'dev'){
      // dev env
      env_authkey = 'dev';
      env_host = hosts.dev.remoteurl;
      env_remotedir = hosts.dev.remotedir;
      console.log('Deploying to Dev Environment');
    } else {
      // production env
      env_authkey = 'live';
      env_host = hosts.live.remoteurl;
      env_remotedir = hosts.live.remotedir;
      console.log('Deploying to Live Environment');
    }


    grunt.initConfig({
      ftp_push: {
        options: {
          incrementalUpdates: true,
          authKey: env_authkey,
          host: env_host,
          dest: env_remotedir,
          port: 21,
          debug: false
        },
        full: {
          files: [
            {expand: true, cwd: 'build', src: ['**/*', 'fonts/*', '.htaccess']}
          ]
        }
      }
    });

    grunt.task.run([
      'ftp_push:full'
    ]);

  });
};
