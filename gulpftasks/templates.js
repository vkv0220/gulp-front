'use strict';

var gulp = require('gulp');
var options = require('../config.js');
var plumber = require('gulp-plumber');
var pug = require('gulp-pug');
var posthtml = require('gulp-posthtml');
var prettify = require('gulp-prettify');

var getJsonData = require('../util/get-json-data.js');

gulp.task('build:pages', function() {
	var jsonData = getJsonData('./tmp/data.json');

	options.pug.locals = jsonData;

	return gulp.src([ '**/*.pug', '!**/_*.pug' ], { cwd: 'source/pages' })
		.pipe(plumber(options.plumber))
		.pipe(pug(options.pug))
		.pipe(posthtml(options.posthtml.plugins, options.posthtml.options))
		.pipe(prettify(options.htmlPrettify))
		.pipe(gulp.dest('dest'));
});
