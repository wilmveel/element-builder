module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
  
	//read package.json
    pkg: grunt.file.readJSON('package.json'),
	
	concat: {
		options: {
			// define a string to put between each file in the concatenated output
			//separator: ';'
		},
		dist: {
			// the files to concatenate
			src: [
				'src/elementModule.js',
				
				'src/elementService.js',
				
				'src/elementController.js',
				
				'src/elementDirective.js',

				'src/elementDirective.js',
				'src/elementIncludeDirective.js',
				
				'src/elementJsonDirective.js',
				'src/elementFrameDirective.js',
				'src/elementHtmlDirective.js',
				'src/elementPreviewDirective.js',
				
				'src/elementNewDirective.js',
				'src/elementEditDirective.js',
				
				'src/elementDragDirective.js',
				'src/elementDropDirective.js',
			],
			// the location of the resulting JS file
			dest: 'dist/<%= pkg.name %>.js'
		}
	},
  
	// Uglify means strip spaces and comments out of the code
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify']);

};