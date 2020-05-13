const { series, src, dest } = require('gulp');
const minify = require('gulp-minify');

function createMin() {
  return src(['src/KeysNav.js'])
    .pipe(minify({ ext: { min: '.min.js' } }))
    .pipe(dest('dist'));
};

function copyToDocs() {
  return src(['dist/KeysNav.min.js'])
    .pipe(dest('docs'));
}

exports.build = series(createMin, copyToDocs);
