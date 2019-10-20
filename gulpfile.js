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


var gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create(),
  useref = require('gulp-useref'),
  cache = require('gulp-cache'),
  plumber = require('gulp-plumber'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCSS = require('gulp-clean-css'),
  minifyCss = require('gulp-minify-css'),
  gulpif = require('gulp-if'),
  imagemin = require('gulp-imagemin'),
  jpegrecompress = require('imagemin-jpeg-recompress'),
  pngquant = require('imagemin-pngquant'),
  del = require('del'),
  replace = require('gulp-string-replace'),
  rigger = require('gulp-rigger'),
  runSequence = require('run-sequence'),
  babel = require('gulp-babel'),
  removeHtmlComments = require('gulp-remove-html-comments');


gulp.task('sass', function () {
  return gulp.src( path.src.scss )
    .pipe( plumber() )              // для отслеживания ошибок
    .pipe( sourcemaps.init() )      // инициализируем sourcemap
    .pipe( sass() )                 // scss -> css
    .pipe( autoprefixer(  {
      overrideBrowserslist: ['last 2 versions'] ,
      cascade: false,
    }  ) )
    .pipe( cleanCSS() )                   // минимизируем CSS
    .pipe( sourcemaps.write( './' ) )     // записываем sourcemap
    .pipe( gulp.dest( path.src.css ) )    // выкладывание готовых файлов
    .pipe( browserSync.stream() );
});

gulp.task('sass:build', function () {
  return gulp.src(path.src.scss)
    .pipe(plumber())      // для отслеживания ошибок
   .pipe(sass())          // scss -> css
    .pipe(autoprefixer({overrideBrowserslist: ['last 2 versions'] , cascade: false }))
    .pipe(cleanCSS())     // минимизируем CSS
    .pipe(gulp.dest(path.src.css))    // выкладывание готовых файлов
  .pipe(browserSync.stream());
});

gulp.task('build:delhtmlcomm', function () {
  //удаляем комментарии в PHP (html)
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

gulp.task('useref', function () {
      //сжатие всего остального
     gulp.src( path.src.html )
        .pipe( useref() )         //парсит специфичные блоки и конкатенирует описанные в них стили и скрипты.
        .pipe( gulpif(  '*.css', minifyCss( {processImport: false} )  ) )
        .pipe( gulp.dest( 'dist' ) );
});


gulp.task('script', () => {       //сжатие скриптов с поддержкой ES6
    return gulp.src('app/assets/js/**/*')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist.js))
});

gulp.task('images', function () {
    gulp.src(path.src.img)          // путь с исходниками картинок
        .pipe(cache(imagemin([      // сжатие изображений
        imagemin.gifsicle({interlaced: true}),
            jpegrecompress({
                progressive: true,
                max: 90,
                min: 80
            }),
            pngquant(),
            imagemin.svgo(  { plugins: [ {removeViewBox: false} ] }  ),
    ])))
        .pipe( gulp.dest( path.dist.img ) );
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
