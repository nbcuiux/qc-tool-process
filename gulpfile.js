/* global require */

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    concat = require('gulp-concat'),
    rigger = require('gulp-rigger'),
    sourcemaps = require('gulp-sourcemaps'),
    less = require('gulp-less'),
    watch = require('gulp-watch');

var path = {
    build: { //
        html: 'build/',
        js: 'build/js/',
        style: 'build/',
        img: 'build/imgs/',
        video: 'build/video/',
        lib: 'build/lib/',
        fonts: 'build/fonts/',
        docs: 'build/docs/'
    },
    src: { //
        html: 'src/html/**/*.html', //
        js: 'src/js/*.js',//
        style: 'src/styles/**/*.less',
        img: ['src/imgs/**/*.png', 'src/imgs/**/*.svg', 'src/imgs/**/*.jpg'],
        video: 'src/video/**/*.*',
        lib: 'src/lib/**/*.*',
        fonts: 'src/fonts/**/*.*',
        docs: 'src/docs/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/**/*.js',
        style: 'src/**/*.less',
        img: 'src/imgs/**/*.*',
        video: 'src/video/**/*.*',
        docs: 'src/docs/**/*.*'
    },
    clean: './build'
};

gulp.task('server', function() {
    browserSync.init({server: {
            baseDir: path.build.html,
            index: "landing/index.html"

        }
    });
});

gulp.task('html', function () {
    return gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //И перезагрузим наш сервер для обновлений
        .pipe(reload({stream: true}));
});

gulp.task('less', function() {
      return gulp.src(path.src.style)
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(gulp.dest(path.build.style))
        .pipe(reload({stream: true}));
});

gulp.task('image', function () {
    return gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});
gulp.task('video', function () {
    return gulp.src(path.src.video)
        .pipe(gulp.dest(path.build.video))
        .pipe(reload({stream: true}));
});
gulp.task('docs', function () {
    return gulp.src(path.src.docs)
        .pipe(gulp.dest(path.build.docs))
        .pipe(reload({stream: true}));
});
gulp.task('fonts', function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({stream: true}));
});
gulp.task('vendor', function () {
    return gulp.src(path.src.lib)
        .pipe(gulp.dest(path.build.lib))
        .pipe(reload({stream: true}));
});

gulp.task('js', function () {
    return gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('build', ['html', 'js', 'less', 'image', 'video', 'docs', 'vendor', 'fonts']);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('less');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image');
    });
    watch([path.watch.video], function(event, cb) {
        gulp.start('video');
    });
    watch([path.watch.docs], function(event, cb) {
        gulp.start('docs');
    });
});

gulp.task('default', ['build', 'server', 'watch']);