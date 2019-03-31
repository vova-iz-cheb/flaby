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

// gulp.task('clean', async function() {
//     return del.sync('dist'); // Удаляем папку dist перед сборкой
// });

// gulp.task('img', function() {
//     return gulp.src('app/img/**/*') // Берем все изображения из app
//         .pipe(cache(imagemin({ // С кешированием
//         // .pipe(imagemin({ // Сжимаем изображения без кеширования
//             interlaced: true,
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],
//             use: [pngquant()]
//         }))/**/)
//         .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
// });

// gulp.task('prebuild', async function() {

//     var buildCss = gulp.src([ // Переносим библиотеки в продакшен
//         'app/css/main.css',
//         'app/css/libs.min.css'
//         ])
//     .pipe(gulp.dest('dist/css'))

//     var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
//     .pipe(gulp.dest('dist/fonts'))

//     var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
//     .pipe(gulp.dest('dist/js'))

//     var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
//     .pipe(gulp.dest('dist'));

// });

// gulp.task('clear', function (callback) {
//     return cache.clearAll();
// })

task('watch', function() {
    watch('app/sass/**/*.scss', series('sass', 'cssnano'));
    watch('app/js/myscript.js', parallel('scripts'));
    watch('app/*.html').on('change', browserSync.reload);
    watch('app/css/main.min.css').on('change', browserSync.reload);
    watch('app/js/script.min.js').on('change', browserSync.reload);
});
task('default', parallel('scripts', 'sass', 'cssnano', 'browser-sync', 'watch'));

// task('build', gulp.parallel('prebuild', 'clean', 'img', 'sass', 'scripts'));