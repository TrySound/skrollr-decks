module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: ['/**\n',
			' * <%= pkg.title || pkg.name %> <%= pkg.version %>',
			' (<%= grunt.template.today("yyyy-mm-dd") %>)',
			' - <%= pkg.description %>\n',
			' * <%= pkg.author.name %> - <%= pkg.homepage %>\n',
			' * Free to use under terms of <%= pkg.license.type %> license\n',
			' */\n\n'].join(''),
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			main: {
				src: ['src/skrollr.decks.js'],
				dest: 'dist/skrollr.decks.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '<%= concat.main.dest %>',
				dest: 'dist/skrollr.decks.min.js'
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');


	grunt.registerTask('default', ['concat', 'uglify']);
};
