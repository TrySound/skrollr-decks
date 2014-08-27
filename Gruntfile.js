module.exports = function(grunt) {
	//Configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json') ,
		jshint: {
			options: {
				smarttabs: false,
				curly: true,
				immed: true,
				latedef: true,
				noarg: true,
				quotmark: 'single',
				undef: true,
				unused: true,
				strict: true,
				globals: {
					window: true,
					document: true,
					navigator: true
				}
			},
			all: ['src/**/*.js']
		},
		uglify: {
			options: {
				banner: '/*! skrollr-decks <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>) | Bogdan Chadkin - https://github.com/TrySound/skrollr-decks | Free to use under terms of MIT license */\n'
			},

			all: {
				files: {
					'dist/skrollr.decks.min.js': 'src/skrollr.decks.js',
				}
			}
		}
	});

	//Dependencies.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	//Tasks.
	grunt.registerTask('default', ['jshint', 'uglify']);
};