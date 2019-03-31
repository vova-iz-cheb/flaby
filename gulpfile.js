const { task, src, dest, watch, series, parallel } = require('gulp'), // Подключаем Gulp
        sass         = require('gulp-sass'), //Подключаем Sass пакет,
        browserSync  = require('browser-sync'), // Подключаем Browser Sync
        concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
        uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
        cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
        rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
        del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
        imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
        pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
        cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
        autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

task('sass', function() {
    return src('app/sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(dest('app/css'))
});

task("browser-sync", function() {
    browserSync.init({
        server: {
            baseDir: "./app",
        },
        notify: false,
    });
});

task('scripts', function() {
    return src([
        'app/js/jquery-1.11.0.min.js',
        'app/js/myscript.js'
        ])
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
});

task('cssnano', function() {
    return src('app/css/main.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('app/css'))
});

task('clean', function() {
    return del('dist')
});

task('prebuild', function() {
    src('app/css/main.min.css')
    .pipe(dest('dist/css'))

    src('app/fonts/**/*')
    .pipe(dest('dist/fonts'))

    src('app/js/script.min.js')
    .pipe(dest('dist/js'))

    return src('app/*.html')
    .pipe(dest('dist'))
});

task('img', function() {
    return src('app/img/**/*')
        .pipe(cache(imagemin({
        // .pipe(imagemin({ // Сжимаем изображения без кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
        }))/**/)
        .pipe(dest('dist/img'))
});

task('clearCache', function (callback) {
    return cache.clearAll();
})

task('watch', function() {
    watch('app/sass/**/*.scss', series('sass', 'cssnano'));
    watch('app/js/myscript.js', parallel('scripts'));
    watch('app/*.html').on('change', browserSync.reload);
    watch('app/css/main.min.css').on('change', browserSync.reload);
    watch('app/js/script.min.js').on('change', browserSync.reload);
});

task('default', parallel('scripts', 'sass', 'cssnano', 'browser-sync', 'watch'));
task('build', series('clean', 'prebuild', 'img'));