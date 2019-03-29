const { task, src, dest, watch, parallel } = require('gulp'), // Подключаем Gulp
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

// task("sass", function() {
//     return src('app/sass/*.+(scss|sass)') // источник 
//       .pipe(sass()) // конвертируем scss -> css
//       .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
//       .pipe(dest('app/css')) // переносим в новую папку
// });

task("browser-sync", function() {
    browserSync.init({
        server: {
            baseDir: "./app",
        },
        notify: false,
    });
});


// gulp.task('scripts', function() {
//     return gulp.src([ // Берем все необходимые библиотеки
//         'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
//         'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
//         ])
//         .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
//         .pipe(uglify()) // Сжимаем JS файл
//         .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
// });

// gulp.task('css-libs', function() {
//     return gulp.src('app/css/libs.css') // Выбираем файл для минификации
//         .pipe(cssnano()) // Сжимаем
//         .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
//         .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
// });

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
    watch('app/sass/**/*.scss', parallel('sass'));
    watch('app/*.html').on('change', browserSync.reload);
    watch('app/css/*.css').on('change', browserSync.reload);
    // watch(['app/js/common.js', 'app/libs/**/*.js'], gulp.parallel('scripts')); // Наблюдение за главным JS файлом и за библиотеками
});
task('default', parallel('sass', 'browser-sync', 'watch'));
// task('default', parallel('css-libs', 'sass', 'scripts', 'browser-sync', 'watch'));
// task('build', gulp.parallel('prebuild', 'clean', 'img', 'sass', 'scripts'));