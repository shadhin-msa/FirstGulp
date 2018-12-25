const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
  -- TOP LEVEL FUNCTIONS --
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
*/


// Logs Message
gulp.task('message', function(){
  return new Promise(function(resolve, reject){
    console.log("Gulp is running....")
    resolve();
  })
  
});


// Copy All HTML files to build/html

gulp.task('html', () =>
   gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
);


// optimize images
gulp.task('image', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);


// Minify JS
gulp.task('minifyJS', () =>
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
)


// Compile Sass
gulp.task('sass', () =>
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
)


//scripts
gulp.task('script', ()=>
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
)




gulp.task('default',gulp.parallel('message', 'html', 'image', 'sass', 'script'));
// gulp.task('default', gulp.parallel( 'html', 'sass', 'script' ));


gulp.task('watch', function(){
  gulp.watch('src/js/*.js', gulp.series('script'));
  gulp.watch('src/images/*', gulp.series('image'));
  gulp.watch('src/sass/*.scss', gulp.series('sass'));
  gulp.watch('src/*.html', gulp.series('html'));
});

