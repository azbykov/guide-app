const gulp = require('gulp');
const del = require('del');
const uglify = require('gulp-uglify');
const install = require('gulp-install');
const runSequence = require('run-sequence');
const cssmin = require('gulp-minify-css');
const symlink = require('gulp-symlink');
const path1 = require('path');

const package = require('./package.json');

const NAME = package.name;

const PATH_UNION_PRODUCTION = path1.join(__dirname, '..', NAME + '-stable');
const LEVEL = '../';
const BUILDS_DIR_NAME_PROD = LEVEL + NAME + '_*';

const buildNameParams = [
	NAME,
    'v' + package.version,
    Date.now()
].join('_');

const buildName = LEVEL + buildNameParams;

const path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
		root: buildName,
		views: buildName + '/templates',
		publicJs: buildName + '/public/js/',
		publicCss: buildName + '/public/css/',
		publicImg: buildName + '/public/img/'
	},
    src: { //Пути откуда брать исходники
		root: __dirname,
        views: 'templates/**/*.jade',
        publicJs: 'public/js/**/*.js',
		publicCss: 'public/css/*.css',
		publicImg: 'public/img/**/*.*'
    },
	exclude: '!public/**/*'
};


gulp.task('clean:stable', function (cb) {
    return del([
        BUILDS_DIR_NAME_PROD,
        PATH_UNION_PRODUCTION
    ], {force: true}, cb);
});

gulp.task('clean:dep', function (cb) {
    return del([
        path.build.root + '/package.json'
    ], {force: true}, cb);
});

gulp.task('views:build', function () {
    return gulp.src(path.src.views) //Выберем файлы по нужному пути
        .pipe(gulp.dest(path.build.views)); //Выплюнем их в папку build
});

gulp.task('js:build:production', function () {
    return gulp.src(path.src.publicJs) //Найдем наш main файл
        .pipe(uglify({mangle: false})) //Сожмем наш js
        .pipe(gulp.dest(path.build.publicJs)); //Выплюнем готовый файл в build
});

gulp.task('js:build:dev', function () {
    return gulp.src(path.src.publicJs) //Найдем наш main файл
        .pipe(gulp.dest(path.build.publicJs)); //Выплюнем готовый файл в build
});

gulp.task('style:build:production', function () {
    return gulp.src(path.src.publicCss) //Выберем наш main.scss
        .pipe(cssmin()) //Сожмем
        .pipe(gulp.dest(path.build.publicCss)); //И в build
});

gulp.task('style:build:dev', function () {
    return gulp.src(path.src.publicCss) //Выберем наш main.scss
        .pipe(gulp.dest(path.build.publicCss)); //И в build
});


gulp.task('framework:build', function () {
    return gulp.src([path.src.root + '/**/*', path.exclude])
        .pipe(gulp.dest(path.build.root));
});

gulp.task('packages:build', function () {
    return gulp.src('./package.json')
        .pipe(gulp.dest(path.build.root))
        .pipe(install({production: true}));
});


gulp.task('symlink:production', function() {
    return gulp.src(path.build.root)
        .pipe(symlink(PATH_UNION_PRODUCTION)); // Write to the destination folder
});

gulp.task('build:production', function (callback) {
    return runSequence('clean:stable',
        [
			'framework:build',
            'views:build',
            'js:build:production',
            'style:build:production'
        ],
        'symlink:production',
        'clean:dep',
        callback
    );
});

gulp.task('build:dev', function (callback) {
    return runSequence('clean:stable',
        [
			'framework:build',
            'views:build',
            'js:build:dev',
            'style:build:dev'
        ],
        'symlink:production',
        'clean:dep',
        callback
    );
});
