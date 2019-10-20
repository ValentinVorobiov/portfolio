"use strict";

var path = {
    dist: {
        html:  'dist/',
        js:    'dist/js',
        css:   'dist/css',
        img:   'dist/img',
        imgwork: 'dist/images',
        fonts: 'dist/fonts',
        libs: 'dist/libs'
    },
    src: {
        html:  './*.html',
        js:    'assets/js/*.js',
        scss: 'assets/sass/**/*.scss',
        css:   'assets/css/',
        img:   'assets/img/**/*.*',
        imgwork:   'assets/images/**/*.*',
        fonts: 'assets/fonts/**/*.*'
    },
    watch: {
        html:  '*.html',
        js:    'assets/js/*.js',
        css:   'assets/css/',
        img:   'assets/img/**/*.*',
        imgwork:   'assets/images/**/*.*',
        fonts: 'assets/fonts/**/*.*'
    },
    clean:     'dist'
};

/* подключаем gulp и плагины */
var gulp = require('gulp'), // подключаем Gulp
	sass = require('gulp-sass'), // модуль для компиляции SASS (SCSS) в CSS
	autoprefixer = require('gulp-autoprefixer'), // модуль для автоматической установки автопрефиксов
	browserSync = require('browser-sync').create(), // сервер для работы и автоматического обновления страниц
	useref = require('gulp-useref'), //парсит специфичные блоки и конкатенирует описанные в них стили и скрипты.
	cache = require('gulp-cache'), // модуль для кэширования
	plumber = require('gulp-plumber'), // модуль для отслеживания ошибок
	uglify = require('gulp-uglify'), // модуль для минимизации JavaScript
	sourcemaps = require('gulp-sourcemaps'), // модуль для генерации карты исходных файлов
	cleanCSS = require('gulp-clean-css'), // плагин для минимизации CSS
	minifyCss = require('gulp-minify-css'),
	gulpif = require('gulp-if'),
	imagemin = require('gulp-imagemin'), // плагин для сжатия PNG, JPEG, GIF и SVG изображений
	jpegrecompress = require('imagemin-jpeg-recompress'), // плагин для сжатия jpeg
	pngquant = require('imagemin-pngquant'), // плагин для сжатия png
	del = require('del'),
	replace = require('gulp-string-replace'), //автозамена строк
	rigger = require('gulp-rigger'), // модуль для импорта содержимого одного файла в другой
	runSequence = require('run-sequence'),
	babel = require('gulp-babel'), //преобразование скриптов с поддержкой ES6
	removeHtmlComments = require('gulp-remove-html-comments'); //удаление комментариев в html-файлах


gulp.task('sass', function () {
  return gulp.src( path.src.scss )
    .pipe( plumber() ) // для отслеживания ошибок
    .pipe( sourcemaps.init() ) // инициализируем sourcemap
    .pipe( sass() ) // scss -> css
    .pipe( autoprefixer(  {
      overrideBrowserslist: ['last 2 versions'] ,
      cascade: false,
    }  ) )
    .pipe( cleanCSS() ) // минимизируем CSS
    .pipe( sourcemaps.write( './' ) ) // записываем sourcemap
    .pipe( gulp.dest( path.src.css ) )  // выкладывание готовых файлов
    .pipe( browserSync.stream() );
});

gulp.task('sass:build', function () {
  return gulp.src(path.src.scss)
  .pipe(plumber()) // для отслеживания ошибок
   .pipe(sass()) // scss -> css
	.pipe(autoprefixer({overrideBrowserslist: ['last 2 versions'] , cascade: false }))
    .pipe(cleanCSS()) // минимизируем CSS
    .pipe(gulp.dest(path.src.css))  // выкладывание готовых файлов
	.pipe(browserSync.stream());
});

gulp.task('build:delhtmlcomm', function () { //удаляем комментрари в PHP (html)
  return gulp.src('dist/**/*.html')
    .pipe(removeHtmlComments())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch( 'assets/sass/*.scss' , ['sass']);
  gulp.watch( './*.html' , browserSync.reload);
  gulp.watch( 'assets/css/*.css' , browserSync.reload);
  gulp.watch( 'assets/js/*.js' , browserSync.reload);
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: './'
    });
});

gulp.task('useref', function () { //сжатие всего остального
     gulp.src( path.src.html )
        .pipe( useref() )  //парсит специфичные блоки и конкатенирует описанные в них стили и скрипты.
        .pipe( gulpif(  '*.css', minifyCss( {processImport: false} )  ) )
        .pipe( gulp.dest( 'dist' ) );
});


gulp.task('script', () => {  //сжатие скриптов с поддержкой ES6
    return gulp.src('app/assets/js/**/*')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist.js))
});

gulp.task('images', function () {
    gulp.src(path.src.img) // путь с исходниками картинок
        .pipe(cache(imagemin([ // сжатие изображений
		    imagemin.gifsicle({interlaced: true}),
            jpegrecompress({
                progressive: true,
                max: 90,
                min: 80
            }),
            pngquant(),
            imagemin.svgo(  { plugins: [ {removeViewBox: false} ] }  ),
		])))
        .pipe( gulp.dest( path.dist.img ) ); // выгрузка готовых файлов
});


gulp.task('browser-sync', function() {
    browserSync.init()
  });


gulp.task('fonts', function () {
	return gulp.src('app/assets/fonts/**/*')
		.pipe(gulp.dest(path.dist.fonts))
});

gulp.task('clean', function () {
	del('dist');
});

gulp.task('build', function (callback) {
	runSequence(
    [ 'clean', 'sass:build', 'useref', 'images', 'fonts', 'script', 'build:delhtmlcomm' ],
    callback);
});

// gulp.task( 'build', gulp.series(
//   [
//     'clean',
//     'sass:build',
//     'useref' ,
//     'images' ,
//     'fonts' ,
//     'script' ,
//     'build:delhtmlcomm' ,
//   ],
//   function( callback ){
//     callback();
//   }

// ) );

gulp.task('default', function (callback) {
	runSequence( [ 'sass' , 'browserSync' , 'watch' ], callback);
});

// gulp.task( 'default', gulp.series(
//   [
//     'sass',
//     'browserSync',
//     'script' ,
//     'watch' ,
//   ],
//   function( callback ){
//     callback();
//   }
// ) );
