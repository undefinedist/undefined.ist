var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var size = require('gulp-size'); //shows the size of the entire project or files
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var jade = require('gulp-jade');
var base64 = require('gulp-base64');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');

//gulp stuff (no watch breaking on errors)
var plumber = require('gulp-plumber');

//live reload task
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('src/css/**.scss', ['css']);
	gulp.watch('src/templates/**', ['jade']);
	gulp.watch('src/css/**', ['css']);
	gulp.watch('src/js/main.js', ['main_js']);
});

// css
gulp.task('css', function() {
	gulp.src('src/css/main.scss')
		.pipe(plumber())
		//.pipe(sourcemaps.init())
		// .pipe(sass({outputStyle: 'compressed'})
		.pipe(sass({outputStyle: ''})
			.on('>>> SASS COMPILING ERROR: ', sass.logError))
		//.pipe(sourcemaps.write())
		.pipe(base64({
			//baseDir: 'public',
			//extensions: ['svg', 'png', 'svg', /\.jpg#datauri$/i],
			//exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
			//maxImageSize: 8*1024, // bytes
			//debug: true
		}))
		.pipe(autoprefixer({
			browsers: ['> 0%'],
			cascade: false
		}))
		.pipe(size())
		.pipe(gulp.dest('build/css'))
		.pipe(livereload({ start: true }));
});

// js
gulp.task('main_js', function() {
	gulp.src([
		'bower_components/jquery/dist/jquery.js',
		//'bower_components/webfontloader/webfontloader.js',
		//'bower_components/parallax.js/parallax.min.js',
		'bower_components/skrollr/dist/skrollr.min.js',
		// 'bower_components/parallax/deploy/parallax.min.js',
		//'bower_components/wow/dist/wow.min.js',
		'bower_components/imagesloaded/imagesloaded.pkgd.min.js',
		'bower_components/jquery_appear/jquery.appear.js',
		'src/js/main.js'])
		.pipe(plumber())
		.pipe(concat('main.js'))
		// .pipe(uglify())
		.pipe(size())
		.pipe(gulp.dest('build/js'))
		.pipe(livereload({ start: true }));
});

// Jade
gulp.task('jade', function(){
	gulp.src(['src/templates/pages/**.jade'])
		.pipe(plumber())
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('build/'))
		.pipe(livereload({ start: true }));
});

// images
gulp.task('img', function() {
	gulp.src('src/img/**')
		//.pipe(magemin({
		//		progressive: true,
		//		optimizationLevel: 1,
		//		svgoPlugins: [
		//			{removeViewBox: false},
		//			{removeDoctype: true},
		//			{removeComments: true},
		//			{cleanupNumericValues:
		//				{floatPrecision: 2}
		//			},
		//			{convertColors: {
		//					names2hex: false,
		//					rgb2hex: false
		//				}
		//			}],
		//		use: [pngquant()]
		//	}
		//))
		.pipe(gulp.dest('build/img'))
});

gulp.task('dev:watch', function () {
	gulp.watch('src/templates/**', ['jade']),
	gulp.watch('src/css/**', ['css']),
	gulp.watch('src/js/main.js', ['main_js']),
	gulp.watch('src/img/**',['img']);
});

gulp.task('compile', ['css', 'main_js', 'img', 'jade']);
