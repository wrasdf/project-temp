module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt, {pattern: ['grunt-*']});
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    devDir: 'src',
    libsDir: 'src/libs',
    publicDir: 'public',
    stylus: {
      compile: {
        files: {
          '<%= devDir %>/styles/main.css': ['<%=devDir%>/styles/main.styl']
        }
      }
    },
    useminPrepare: {
      html: '<%= devDir %>/*.html',
      options: {
        dest: '<%= publicDir %>'
      }
    },
    usemin: {
      html: ['<%= publicDir %>/*.html'],
      options: {
        assetsDirs: ['<%= publicDir %>']
      }
    },
    copy: {
      html: {
          files: [
              {
                  expand: true,
                  cwd: '<%=devDir%>/',
                  src: '*.html',
                  dest: '<%=publicDir%>/'
              }
          ]
      }
    },
    clean: {
      dist: ['public/styles', 'public/js', 'public/*.html']
    },
    watch: {
      html: {
        files: '<%=devDir%>/*.html',
        options: {
            livereload: true
        }
      },
      js: {
        files: ' <%=devDir%>/js/**',
        options: {
          livereload: true
        }
      },
      stylus: {
        files: '<%=devDir%>/styles/**/*.styl',
        tasks: ['stylus'],
        options: {
          livereload: true
        }
      }
    },
    rev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
      },
      assets: {
        files: [{
          src: [
            '<%= publicDir %>/js/{,*/}*.js',
            '<%= publicDir %>/styles/{,*/}*.css'
          ]
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= publicDir %>',
          src: '{,*/}*.html',
          dest: '<%= publicDir %>'
        }]
      }
    },

    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
              '.tmp',
              'public',
              'src'
          ],
          middleware: function (connect, options) {
              var middlewares = [];
              var directory = options.directory || options.base[options.base.length - 1];
              if (!Array.isArray(options.base)) {
                  options.base = [options.base];
              }
              // Setup the proxy

              options.base.forEach(function(base) {
                  // Serve static files.
                  middlewares.push(connect.static(base));
              });

              // Make directory browse-able.
              middlewares.push(connect.directory(directory));
              return middlewares;
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= publicDir %>'
        }
      }
    }
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist', 'watch']);
    }
    grunt.task.run([
      'clean',
      'stylus',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean',
    'stylus',
    'copy:html',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin'
  ]);
};
