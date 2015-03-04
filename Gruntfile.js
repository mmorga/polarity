module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'work',
          imagesPath: 'work',
          environment: 'production'
        },
        files: {
          'style.css': 'style.scss'
        }
      }
    },
    svgmin: {
      options: {
        plugins: [
          {
            removeViewBox: false
          }, {
            removeUselessStrokeAndFill: false
          }
        ]
      },
      dist: {
        files: {
          'work/polarity-top.svg': 'images/polarity-top.svg',
          'work/polarity-bottom.svg': 'images/polarity-bottom.svg',
          'work/flag.svg': 'images/flag.svg'
        }
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true,
          data: function(dest, src) {
            return grunt.file.readYAML(grunt.config.get("polarity"));
          }
        },
        files: {
          'dist/index.html': 'jade/index.jade'
        }
      }
    },
    watch: {
      images: {
        files: ['images/*.svg'],
        tasks: ['svgmin']
      },
      sass: {
        files: ['work/*.svg', 'sass/*.scss'],
        tasks: ['compass']
      },
      html: {
        files: ['work/style.css', 'jade/index.jade', 'polarity.yml'],
        tasks: ['jade']
      }
    },
    clean: ["work", "dist"],
    polarity: "polarity.yml"
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', function(polarityFile) {
    grunt.task.run(['svgmin', 'compass', 'jade']);
    if (arguments.length === 1) {
      grunt.config.set("polarity", polarityFile);
    }
  });
};
