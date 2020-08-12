/*jslint
    white */
/* global
  grunt */
const sass = require('node-sass');

module.exports = function (grunt) {
  'use script';

  // Configs
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: [
              'fonts/**',
              'scripts/**',
              'images/**',
              '*.txt',
              'favicon.ico'
            ],
            dest: 'build/'
          }
        ]
      }
    },
    postcss: {
      options: {
        map: true, // inline sourcemaps
        processors: [
          require('tailwindcss')()
        ]
      },
      dist: {
        expand: true,
        cwd: 'src/sass/',
        src: ['tw.css'],
        dest: 'build/css-temp/',
        ext: '.css'
      }
    },
    sass: {
      build: {
        options: {
          implementation: sass,
          outputStyle: 'compressed',
          sourcemap: 'none'
        },
        files:  [
          {
            expand: true,
            cwd: 'src/sass',
            src: ['**/*.scss', "!libs/*.scss", "!components/*.scss"],
            dest: 'build/css-temp',
            ext: '.css'
          }
        ]
      }
    },
    cssmin: {
      build: {
        options: {
          mergeIntoShorthands: false,
          roundingPrecision: -1
        },
        files: {
          // 'build/css/output.css': ['build/css-temp/tw.purged.css', 'build/css-temp/theme.css']
          'build/css/output.css': ['build/css-temp/tw.css', 'build/css-temp/theme.css']
        }
      }
    },
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 4000,
          base: 'build/',
          livereload: true
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
      },
      cssTemp: {
        src: ['build/css-temp']
      }
    },
    watch: {
      options: { livereload: true },
      files: ['src/**/*.pug', 'src/**/*.js', 'src/**/*.scss'],
      tasks: ['build']
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-postcss')
  grunt.loadNpmTasks('grunt-ftp-push');

  // Registered Tasks
  grunt.registerTask('build',
    [
      'clean:build',
      'copy:build',
      'pug:build',
      'buildCSS'
    ]);

  grunt.registerTask('wipe',
    [
      'clean:build'
    ]);

  grunt.registerTask('default',
    [
      'build'
    ]);

  grunt.registerTask('buildCSS',
    [
      'postcss'
      ,'sass:build'
      ,'cssmin:build'
      ,'clean:cssTemp'
    ]
  )

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

    if(target === 'live'){
      // production env
      env_authkey = 'live';
      env_host = hosts.live.remoteurl;
      env_remotedir = hosts.live.remotedir;
      console.info('Deploying to Live Environment');
    } else {
      // dev env
      env_authkey = 'dev';
      env_host = hosts.dev.remoteurl;
      env_remotedir = hosts.dev.remotedir;
      console.info('Deploying to Dev Environment');
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
            {expand: true, cwd: 'build', src: ['**/*', '.htaccess']},
            {expand: true, cwd: 'build', src: ['fonts/**/*']}
          ]
        },
        fonts: {
          files: [
            {expand: true, cwd: 'build', src: ['fonts/**/*']}
          ]
        }
      }
    });

    if(grunt.option('fonts')){
      grunt.task.run([
        'ftp_push:fonts'
      ]);
    } else {
      grunt.task.run([
        'ftp_push:full'
      ]);
    }

  });
};
