var fs = require('fs');

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
            var polarityYml = grunt.file.readYAML(grunt.config.get("polarity"));
            fs.writeFileSync("polarity.json", JSON.stringify(polarityYml), "utf-8");
            var md = require('markdown-it')();

            function stringSection(value, indent) {
              var str = "";
              if (typeof value === 'string') {
                str = value + '\n';
              } else if ((typeof value === 'object') && (value.length === undefined)) {
                Object.keys(value).forEach(function(key) {
                  str = str + indent + stringSection(key, indent) + stringSection(value[key], indent + "  ");
                });
              } else if ((typeof value === 'object') && (value.length >= 0)) {
                value.forEach(function(val) {
                  str = str + indent + '- ' + stringSection(val, indent);
                });
              }
              return str;
            }

            function markdownSection(value) {
              var str = stringSection(value, "");
              var markdown = md.render(str);
              return markdown;
            }

            polarityYml.leftPole.actionSteps = markdownSection(polarityYml.leftPole.actionSteps);
            polarityYml.leftPole.positiveResults = markdownSection(polarityYml.leftPole.positiveResults);
            polarityYml.leftPole.negativeResults = markdownSection(polarityYml.leftPole.negativeResults);
            polarityYml.leftPole.earlyWarnings = markdownSection(polarityYml.leftPole.earlyWarnings);
            polarityYml.rightPole.actionSteps = markdownSection(polarityYml.rightPole.actionSteps);
            polarityYml.rightPole.positiveResults = markdownSection(polarityYml.rightPole.positiveResults);
            polarityYml.rightPole.negativeResults = markdownSection(polarityYml.rightPole.negativeResults);
            polarityYml.rightPole.earlyWarnings = markdownSection(polarityYml.rightPole.earlyWarnings);

            return polarityYml;
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
