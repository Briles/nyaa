'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        outputStyle: 'compressed',
        precision: 10,
        sourceMap: false,
      },
      dist: {
        files: {
          'main.min.css': 'assets/scss/main.scss',
        },
      },
    },
    concat: {
      main: {
        src: ['node_modules/normalize.css/normalize.css', 'main.min.css', 'assets/css/nyaafont.css'],
        dest: 'main.min.css',
      },
    },
    uncss: {
      dist: {
        options: {
          ignore: ['.js-*', /::?-[\w\d]+/],
          stylesheets: ['main.min.css'],
          ignoreSheets: ['/fonts.googleapis/', '/brick.a.ssl.fastly.net/'],
        },
        files: {
          'main.min.css': ['signup.html', 'upload.html', 'view.html', 'help.html', 'index.html', 'login.html', 'profile.html', 'settings.html',],
        },
      },
    },
    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({
            browsers: ['> 1%'],
          }),
        ],
      },
      dist: {
        src: 'main.min.css',
        dest: 'main.min.css',
      },
    },
    csscomb: {
      main: {
        src: 'main.min.css',
        dest: 'main.min.css',
      },
    },
    cssmin: {
      options: {
        keepSpecialComments: 1,
        roundingPrecision: -1,
        aggressiveMerging: true,
        advanced: true,
      },
      main: {
        src: 'main.min.css',
        dest: 'main.min.css',
      },
    },
    jade: {
      compile: {
        options: {
          data: {
            data: grunt.file.readJSON('data.json'),
          },
        },
        files: [{
          expand: true,
          cwd: 'templates/',
          src: ['*.jade'],
          dest: '',
          ext: '.html',
        },],
      },
    },
    htmlmin: {
      dist: {
        options: {
          caseSensitive: true,
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: false,
          keepClosingSlash: false,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          removeAttributeQuotes: false,
          removeCDATASectionsFromCDATA: true,
          removeComments: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeEmptyElements: false,
          removeIgnored: true,
          removeOptionalTags: true,
          removeRedundantAttributes: false,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
        expand: true,
        cwd: './',
        src: ['*.html'],
        dest: '',
      },
    },
    watch: {
      options: {
        spawn: false,
        interrupt: true,
        event: ['changed'],
        livereload: true,
      },
      css: {
        files: ['assets/scss/**/*.scss'],
        tasks: ['sass', 'concat', 'uncss', 'postcss', 'cssmin'],
      },
      jade: {
        files: ['templates/**/*.jade'],
        tasks: ['jade', 'htmlmin'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.registerTask('default', ['watch']);
};
