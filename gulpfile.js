var browserSync = require('browser-sync');
var gulp = require('gulp');
var rename = require('gulp-rename');
var ts = require('gulp-typescript');
var nodemon = require('gulp-nodemon');
var tsProject = ts.createProject('tsconfig.json', {typescript: require('typescript')});

gulp.task('js', function() {
    var tsResult = tsProject.src()
      .pipe(ts(tsProject));

    return tsResult.js
      .pipe(gulp.dest('public/js'));
});

gulp.task('libs', function () {
    return gulp.src([
          'node_modules/es6-shim/es6-shim.min.js',
          'node_modules/systemjs/dist/system-polyfills.js',
          'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
          'node_modules/angular2/bundles/angular2-polyfills.js',
          'node_modules/systemjs/dist/system.src.js',
          'node_modules/rxjs/bundles/Rx.js',
          'node_modules/angular2/bundles/angular2.dev.js'
        ])
      .pipe(gulp.dest('public/js'));
});

gulp.task('default', ['js', 'libs', 'browser-sync'], function () {
  gulp.watch('src/**/*.ts', ['js']);
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
    files: ["public/**/*.*", "views/**/*"],
    port: 7000
	});
});

gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: 'index.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	});
});
