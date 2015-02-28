var gulp = require('gulp'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	header = require('gulp-header'),
	template = ['/*!',
				' * <%= name %> <%= version %>',
				' * <%= description %>',
				' * <%= homepage %>',
				' * ',
				' * Released under the <%= license %> license',
				' * Copyright (c) <%= new Date().getFullYear() %>, <%= author %>',
				' */\n\n'].join('\n');


gulp.task('default', function () {
	var pkg = JSON.parse(require('fs').readFileSync('package.json'));
	gulp.src('src/skrollr.decks.js')
		.pipe(header(template, pkg))
		.pipe(gulp.dest('dist'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify({
			preserveComments: 'some'
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('dev', ['default'], function () {
	gulp.watch(['package.json', 'src/*.js'], ['default']);
})
