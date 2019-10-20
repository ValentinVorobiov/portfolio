"use strict";

// var path = {
//     dist: {
//         html:  'dist/',
//         js:    'dist/js',
//         css:   'dist/css',
//         img:   'dist/img',
//         imgwork: 'dist/images',
//         fonts: 'dist/fonts',
//         libs: 'dist/libs'
//     },
//     src: {
//         html:  'app/*.html',
//         js:    'app/assets/js/*.js',
//         scss: 'app/assets/sass/**/*.scss',
//         css:   'app/assets/css/',
//         img:   'app/assets/img/**/*.*',
//         imgwork:   'app/assets/images/**/*.*',
//         fonts: 'app/assets/fonts/**/*.*'
//     },
//     watch: {
//         html:  'app/*.html',
//         js:    'app/assets/js/*.js',
//         css:   'app/assets/css/',
//         img:   'app/assets/img/**/*.*',
//         imgwork:   'app/assets/images/**/*.*',
//         fonts: 'app/assets/fonts/**/*.*'
//     },
//     clean:     'dist'
// };

var pathMain = {
    dist: {
        html:       'dist/',
        js:         'dist/js',
        css:        'dist/css',
        img:        'dist/img',
        imgwork:    'dist/images',
        fonts:      'dist/fonts',
        libs:       'dist/libs',
     },
    src: {
        html:       './*.html',
        js:         './assets/js/*.js',
        scss:       './assets/sass/**/*.scss',
        css:        './assets/css/',
        img:        './assets/img/**/*.*',
        imgwork:    './assets/images/**/*.*',
        fonts:      './assets/fonts/**/*.*',
    },
    watch: {
        html:       './*.html',
        js:         './assets/js/*.js',
        css:        './assets/css/',
        img:        './assets/img/**/*.*',
        imgwork:    './app/assets/images/**/*.*',
        fonts:      './app/assets/fonts/**/*.*',
    },
    clean: 'dist',
}

var pathTheyalow = {
    dist: {
        html:       'dist/projects/theyalow/',
        js:         'dist/projects/theyalow/js',
        css:        'dist/projects/theyalow/css',
        img:        'dist/projects/theyalow/dist/img',
        imgwork:    'dist/projects/theyalow/dist/images',
        fonts:      'dist/projects/theyalow/dist/fonts',
        libs:       'dist/projects/theyalow/dist/libs',
    },
    src: {
        html:       'projects/theyalow/*.html',
        js:         'projects/theyalow/assets/js/*.js',
        scss:       'projects/theyalow/assets/sass/**/*.scss',
        css:        'projects/theyalow/assets/css/',
        img:        'projects/theyalow/assets/img/**/*.*',
        imgwork:    'projects/theyalow/assets/images/**/*.*',
        fonts:      'projects/theyalow/assets/fonts/**/*.*',
    },
    watch: {
        html:       'projects/theyalow/*.html',
        js:         'projects/theyalow/assets/js/*.js',
        css:        'projects/theyalow/assets/css/',
        img:        'projects/theyalow/assets/img/**/*.*',
        imgwork:    'projects/theyalow/app/assets/images/**/*.*',
        fonts:      'projects/theyalow/app/assets/fonts/**/*.*',
    },
    clean: 'dist/projects/theyalow'
}

var pathRepairDesign = {
    dist: {
        html:       'dist/projects/repair-design-project/',
        js:         'dist/projects/repair-design-project/js',
        css:        'dist/projects/repair-design-project/css',
        img:        'dist/projects/repair-design-project/dist/img',
        imgwork:    'dist/projects/repair-design-project/dist/images',
        fonts:      'dist/projects/repair-design-project/dist/fonts',
        libs:       'dist/projects/repair-design-project/dist/libs',
    },
    src: {
        html:       'projects/repair-design-project/*.html',
        js:         'projects/repair-design-project/assets/js/*.js',
        scss:       'projects/repair-design-project/assets/sass/**/*.scss',
        css:        'projects/repair-design-project/assets/css/',
        img:        'projects/repair-design-project/assets/img/**/*.*',
        imgwork:    'projects/repair-design-project/assets/images/**/*.*',
        fonts:      'projects/repair-design-project/assets/fonts/**/*.*',
    },
    watch: {
        html:       'projects/repair-design-project/*.html',
        js:         'projects/repair-design-project/assets/js/*.js',
        css:        'projects/repair-design-project/assets/css/',
        img:        'projects/repair-design-project/assets/img/**/*.*',
        imgwork:    'projects/repair-design-project/app/assets/images/**/*.*',
        fonts:      'projects/repair-design-project/app/assets/fonts/**/*.*',
    },
    clean: 'dist/projects/repair-design-project'
}



var gulp = require( 'gulp' ),
    sass = require( 'gulp-sass' ),
    autoprefixer = require( 'gulp-autoprefixer' ),
    browserSync = require( 'browser-sync' ).create(),
    useref = require( 'gulp-useref' ),
    cache = require( 'gulp-cache' ),
    plumber = require( 'gulp-plumber' ),
    uglify = require( 'gulp-uglify' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    cleanCSS = require( 'gulp-clean-css' ),
    minifyCss = require( 'gulp-minify-css' ),
    gulpif = require( 'gulp-if' ),
    imagemin = require( 'gulp-imagemin' ),
    jpegrecompress = require( 'imagemin-jpeg-recompress' ),
    pngquant = require( 'imagemin-pngquant' ),
    del = require( 'del' ),
    replace = require( 'gulp-string-replace' ),
    rigger = require( 'gulp-rigger' ),
    runSequence = require( 'run-sequence' ),
    babel = require( 'gulp-babel' ),
    removeHtmlComments = require( 'gulp-remove-html-comments' );

    gulp.task( 'main-sass' , function () {
        return gulp.src( pathMain.src.scss )
            .pipe( plumber() )
            .pipe( sourcemaps.init() )
            .pipe( sass() )
            .pipe( autoprefixer( {
                overrideBrowserslist: [ 'last 2 versions' ],
                cascade: false,
            } ) )
            .pipe( cleanCSS() )
            .pipe( sourcemaps.write( './' ) )
            .pipe( gulp.dest( pathMain.src.css ) )
            .pipe( browserSync.stream() );
    } );

    gulp.task( 'theyalow-sass', function() {
        return gulp.src( pathTheyalow.src.scss )
            .pipe( plumber() )
            .pipe( sourcemaps.init() )
            .pipe( sass() )
            .pipe( autoprefixer( {
                overrideBrowserslist: [ 'last 2 versions' ],
                cascade: false,
            } ) )
            .pipe( cleanCSS() )
            .pipe( sourcemaps.write( './' ) )
            .pipe( gulp.dest( pathTheyalow.src.css ) )
            .pipe( browserSync.stream() );
    } );

    gulp.task( 'repair-design-sass', function() {
        return gulp.src( pathRepairDesign.src.scss )
            .pipe( plumber() )
            .pipe( sourcemaps.init() )
            .pipe( sass() )
            .pipe( autoprefixer( {
                overrideBrowserslist: [ 'last 2 versions' ],
                cascade: false,
            } ) )
            .pipe( cleanCSS() )
            .pipe( sourcemaps.write( './' ) )
            .pipe( gulp.dest( pathRepairDesign.src.css ) )
            .pipe( browserSync.stream() );
    } );

    gulp.task( 'main-sass:build', function() {
        return gulp.src( pathMain.src.sass )
            .pipe( plumber() )
            .pipe( sass() )
            .pipe( autoprefixer( {
                overrideBrowserslist: [ 'last 2 versions' ],
                cascade: false,
            } ) )
            .pipe( cleanCSS() )
            .pipe( gulp.dest( pathMain.src.css ) )
            .pipe( browserSync.stream() );
    } );

    gulp.task( 'theyalow-sass:build', function() {
        return gulp.src( pathTheyalow.src.sass )
            .pipe( plumber() )
            .pipe( sass() )
            .pipe( autoprefixer( {
                overrideBrowserslist: [ 'last 2 versions' ],
                cascade: false,
            } ) )
            .pipe( cleanCSS() )
            .pipe( gulp.dest( pathTheyalow.src.css ) )
            .pipe( browserSync.stream() );
    } );

    gulp.task( 'repair-design-sass:build', function() {
        return gulp.src( pathRepairDesign.src.sass )
            .pipe( plumber() )
            .pipe( sass() )
            .pipe( autoprefixer( {
                overrideBrowserslist: [ 'last 2 versions' ],
                cascade: false,
            } ) )
            .pipe( cleanCSS() )
            .pipe( gulp.dest( pathRepairDesign.src.css ) )
            .pipe( browserSync.stream() );
    } );

    // gulp.task('sass', function () {
    //     return gulp.src( path.src.scss )
    //       .pipe( plumber() ) // для отслеживания ошибок
    //       .pipe( sourcemaps.init() ) // инициализируем sourcemap
    //       .pipe( sass() ) // scss -> css
    //       .pipe( autoprefixer(  {
    //         overrideBrowserslist: ['last 2 versions'] ,
    //         cascade: false,
    //       }  ) )
    //       .pipe( cleanCSS() ) // минимизируем CSS
    //       .pipe( sourcemaps.write( './' ) ) // записываем sourcemap
    //       .pipe( gulp.dest( path.src.css ) )  // выкладывание готовых файлов
    //       .pipe( browserSync.stream() );
    //   });

    // gulp.task('sass:build', function () {
    //     return gulp.src(path.src.scss)
    //     .pipe(plumber()) // для отслеживания ошибок
    //      .pipe(sass()) // scss -> css
    //       .pipe(autoprefixer({overrideBrowserslist: ['last 2 versions'] , cascade: false }))
    //       .pipe(cleanCSS()) // минимизируем CSS
    //       .pipe(gulp.dest(path.src.css))  // выкладывание готовых файлов
    //       .pipe(browserSync.stream());
    //   });


gulp.task('build:delhtmlcomm', function () {
  return gulp.src( 'dist/**/*.html' )
    .pipe( removeHtmlComments() )
    .pipe(gulp.dest('dist'));
});

gulp.task( 'main-watch', function() {

    // gulp.watch( pathMain.src.scss, [ 'main-sass' ] );
    // gulp.watch( pathMain.src.html, browserSync.reload );
    // gulp.watch( pathMain.src.css.concat( '*.css' ), browserSync.reload );
    // gulp.watch( pathMain.src.js, browserSync.reload );

    let tmpRes = null;

    console.log( '#main-watch starts...' ) ;
    tmpRes = gulp.watch( 'assets/sass/*.scss', [ 'main-sass' ] );
    console.log( '#main-watch passed main-sass, tmpRes: \n', tmpRes ) ;
    tmpRes = gulp.watch( './*.html', browserSync.reload );
    console.log( '#main-watch passed HTML Watcher, tmpRes: \n', tmpRes ) ;
    tmpRes = gulp.watch( 'assets/css/*.css', browserSync.reload );
    console.log( '#main-watch passed CSS Watcher, tmpRes: \n', tmpRes ) ;
    tmpRes = gulp.watch( 'assets/js/*.js', browserSync.reload );
    console.log( '#main-watch passed JS Watcher, tmpRes: \n', tmpRes ) ;


} );

gulp.task( 'theyalow-watch', function() {
    gulp.watch( pathTheyalow.src.scss, [ 'theyalow-sass' ] );
    gulp.watch( pathTheyalow.src.html, browserSync.reload );
    gulp.watch( pathTheyalow.src.css.concat( '*.css' ), browserSync.reload );
    gulp.watch( pathTheyalow.src.js, browserSync.reload );
} );

gulp.task( 'repair-design-watch', function() {
    gulp.watch( pathRepairDesign.src.scss, [ 'repair-design-sass' ] );
    gulp.watch( pathRepairDesign.src.html, browserSync.reload );
    gulp.watch( pathRepairDesign.src.css.concat( '*.css' ), browserSync.reload );
    gulp.watch( pathRepairDesign.src.js, browserSync.reload );
} );

// gulp.task( 'common-watch', () => {
//     gulp.watch( pathRepairDesign.src.scss, [ 'repair-design-sass' ] );
//     gulp.watch( pathTheyalow.src.scss, [ 'theyalow-sass' ] );
//     gulp.watch( pathMain.src.scss, [ 'main-sass' ] );
//     gulp.watch( pathRepairDesign.src.html, browserSync.reload );
//     gulp.watch( pathRepairDesign.src.css.concat( '*.css' ), browserSync.reload );
//     gulp.watch( pathRepairDesign.src.js, browserSync.reload );
//     gulp.watch( pathTheyalow.src.html, browserSync.reload );
//     gulp.watch( pathTheyalow.src.css.concat( '*.css' ), browserSync.reload );
//     gulp.watch( pathTheyalow.src.js, browserSync.reload );
//     gulp.watch( pathMain.src.html, browserSync.reload );
//     gulp.watch( pathMain.src.css.concat( '*.css' ), browserSync.reload );
//     gulp.watch( pathMain.src.js, browserSync.reload );
// } );

// gulp.task('watch', function () {
//   gulp.watch('app/assets/sass/*.scss', ['sass']);
//   gulp.watch('app/*.html', browserSync.reload);
//   gulp.watch('app/assets/css/*.css', browserSync.reload);
//   gulp.watch('app/assets/js/*.js', browserSync.reload);
// });

gulp.task( 'bd-browser-sync', function() {
    browserSync.init(
        {  server: { baseDir : './' }  }
    );
} )

gulp.task( 'browser-sync', function() {
    browserSync.init();
} );

gulp.task( 'useref-main', function() {
    gulp.src( pathMain.src.html )
        .pipe( useref() )
        .pipe( gulpif( '*.css', minifyCss( { processImport:false } )  ) )
        .pipe( gulp.dest( pathMain.dist.html ) )
} );

gulp.task( 'useref-theyalow', function() {
    gulp.src( pathTheyalow.src.html )
        .pipe( useref() )
        .pipe( gulpif( '*.css', minifyCss( { processImport:false } )  ) )
        .pipe( gulp.dest( pathTheyalow.dist.html ) )
} );

gulp.task( 'useref-repair-design', function() {
    gulp.src( pathRepairDesign.src.html )
        .pipe( useref() )
        .pipe( gulpif( '*.css', minifyCss( { processImport:false } )  ) )
        .pipe( gulp.dest( pathRepairDesign.dist.html ) )
} );

gulp.task('useref', function () {
     gulp.src( path.src.html )
        .pipe( useref() )
        .pipe( gulpif(  '*.css', minifyCss( {processImport: false} )  ) )
        .pipe( gulp.dest( 'dist' ) );
});

gulp.task( 'script-main', function() {
    return gulp.src( pathMain.src.js )
        .pipe( babel( { presets: [ '@babel/env' ] } ) )
        .pipe( gulp.dest( pathMain.dist.js ) );
} );

gulp.task( 'script-theyalow', function() {
    return gulp.src( pathTheyalow.src.js )
        .pipe( babel( { presets: [ '@babel/env' ] } ) )
        .pipe( gulp.dest( pathTheyalow.dist.js ) );
} );

gulp.task( 'script-repair-design', function() {
    return gulp.src( pathRepairDesign.src.js )
        .pipe( babel( { presets: [ '@babel/env' ] } ) )
        .pipe( gulp.dest( pathRepairDesign.dist.js ) );
} );

gulp.task( 'script' , () => {
    return gulp.src('app/assets/js/**/*')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist.js))
});

gulp.task( 'images-main', function() {
    gulp.src( pathMain.src.img )
        .pipe( cache( imagemin( [
            imagemin.gifsicle( { interlaced : true } ),
            jpegrecompress( {
                progressive: true,
                max: 90, min: 80,
            } ),
            pngquant(),
            imagemin.svgo( {
                plugins: [ { removeViewBox : false } ]
            } ),
        ] ) ) )
        .pipe( gulp.dest( pathMain.dist.img ) );
} );

gulp.task( 'images-theyalow', function() {
    gulp.src( pathTheyalow.src.img )
        .pipe( cache( imagemin( [
            imagemin.gifsicle( { interlaced : true } ),
            jpegrecompress( {
                progressive: true,
                max: 90, min: 80,
            } ),
            pngquant(),
            imagemin.svgo( {
                plugins: [ { removeViewBox : false } ]
            } ),
        ] ) ) )
        .pipe( gulp.dest( pathTheyalow.dist.img ) );
} );

gulp.task( 'images-repair-design', function() {
    gulp.src( pathRepairDesign.src.img )
        .pipe( cache( imagemin( [
            imagemin.gifsicle( { interlaced : true } ),
            jpegrecompress( {
                progressive: true,
                max: 90, min: 80,
            } ),
            pngquant(),
            imagemin.svgo( {
                plugins: [ { removeViewBox : false } ]
            } ),
        ] ) ) )
        .pipe( gulp.dest( pathRepairDesign.dist.img ) );
} );


gulp.task('images', function () {
    gulp.src(path.src.img)
        .pipe(cache(imagemin([
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


// gulp.task('browser-sync', function() {
//     browserSync.init()
//   });


gulp.task( 'fonts-main', function() {
      return gulp.src( pathMain.src.fonts )
      .pipe( gulp.dest( pathMain.dist.fonts ) );
  } );

gulp.task( 'fonts-theyalow', function() {
    return gulp.src( pathTheyalow.src.fonts )
    .pipe( gulp.dest( pathTheyalow.dist.fonts ) );
} );

gulp.task( 'fonts-repair-design', function() {
    return gulp.src( pathRepairDesign.src.fonts )
    .pipe( gulp.dest( pathRepairDesign.dist.fonts ) );
} );

// gulp.task('fonts', function () {
//     return gulp.src('app/assets/fonts/**/*')
//         .pipe(gulp.dest(path.dist.fonts))
// });

gulp.task('clean', function () {
    del( 'dist' );
});



// gulp.task('build', function (callback) {
//     runSequence(
//         [
//             'clean',
//             'repair-design-sass:build',
//             'theyalow-sass:build',
//             'main-sass:build',
//             'useref-repair-design',
//             'useref-theyalow',
//             'useref-main',
//             'images-repair-design',
//             'images-theyalow',
//             'images-main',
//             'fonts-repair-design',
//             'fonts-theyalow',
//             'fonts-main',
//             'script-repair-design',
//             'script-theyalow',
//             'script-main',
//             'build:delhtmlcomm',
//         ],
//         callback
//     );
// });

gulp.task( 'build' , gulp.series(
    'clean',
    'repair-design-sass:build',
    'theyalow-sass:build',
    'main-sass:build',
    'useref-repair-design',
    'useref-theyalow',
    'useref-main',
    'images-repair-design',
    'images-theyalow',
    'images-main',
    'fonts-repair-design',
    'fonts-theyalow',
    'fonts-main',
    'script-repair-design',
    'script-theyalow',
    'script-main',
    'build:delhtmlcomm',
    function( done ){ done() ; }
) );

// gulp.task( 'build', gulp.series(
//     'clean',
//     'sass:build',
//     'useref',
//     'images',
//     'fonts',
//     'script',
//     'build:delhtmlcomm',
//     function( done ){ done(); }
// ) );


gulp.task(
    'default',
    gulp.series(
      // 'repair-design-sass',
      // 'theyalow-sass',
      'main-sass',
      'bd-browser-sync',
      // 'repair-design-watch',
      // 'theyalow-watch',
      'main-watch',
      // function( done ){ done(); }
    )
);

// gulp.task( 'default', gulp.series(
//     'sass',
//     'browserSync',
//     'watch',
//     function( done ){ done(); }
//     )
// ); /* IT WORKS */
