const { src, dest, parallel, series, npm, watch } = require('gulp');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync');
const fileIncludes = require('gulp-file-include');
const svgSprite = require('gulp-svg-sprite');
const del = require('del');
const webpackStream = require('webpack-stream');
const uglify = require('gulp-uglify-es').default;
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');

function fonts() {
    src('./src/fonts/**.ttf')
        .pipe(ttf2woff())
        .pipe(dest('./dist/fonts/'))
    return src('./src/fonts/**.ttf')
        .pipe(ttf2woff2())
        .pipe(dest('./dist/fonts/'))
}

function scripts() {
    return src('./src/js/index.js')
        .pipe(webpackStream({
            output: {
                filename: 'index.js'
            },
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ['@babel/preset-env', { targets: "defaults" }]
                                ]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(uglify().on('error', notify.onError()))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./dist/js/'))
        .pipe(browserSync.stream())
}

function styles() {
    return src(['./src/sass/**/*.sass', './src/sass/**/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', notify.onError()))
        .pipe(rename({suffix: '.min'}))
        .pipe(autoprefixer({
            cascade: false,
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./dist/css/'))
        .pipe(browserSync.stream())
}

function htmlIncludes() {
    return src(['./src/index.html'])
        .pipe(fileIncludes({
            prefix: '@',
            basepath: '@file'
        }))
        .pipe(dest('./dist'))
        .pipe(browserSync.stream())
}

function imgRefactor() {
    return src(['./src/images/**.*', '!./src/images/**.svg',])
        .pipe(dest('./dist/images/'))
}

function svgToSprite() {
    return src(['./src/images/**.svg'])
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../sprite.svg"
                }
            }
        }))
        .pipe(dest('./dist/images'))
}

function clean() {
    return del('dist/*')
}

function watchFiles() {
    browserSync.init({
        proxy: 'localhost:8888/archi/dist'
    });

    watch(['./src/sass/**/*.sass', './src/sass/**/*.scss'], styles);
    watch('./src/index.html', htmlIncludes);
    watch([ './src/images/**.*', '!./src/images/**.svg'], imgRefactor);
    watch('./src/images/**.svg', svgToSprite);
    watch('./src/js/**/*.js', scripts);
    watch('./src/fonts/**.ttf', fonts);
}

exports.styles = styles;
exports.htmlIncludes = htmlIncludes;
exports.watchFiles = watchFiles;

exports.default = series(clean, parallel(htmlIncludes, fonts, scripts, imgRefactor, svgToSprite), styles, watchFiles);
