let gulp = require('gulp');
let zip = require('gulp-zip');
let notify = require("gulp-notify");
let path = require('path');
let fs = require('fs');


function altchainJSZip() {
  let filename = 'altchain.zip'
  return gulp.src([
    './dist/**/*',
  ], {dot: true,}).pipe(zip(filename))
    .pipe(gulp.dest('../'))
    .pipe(notify({
      message: 'Архив готов',
      sound: true,
      title: 'altchain JS'
    }))

}
const copyFiles = gulp.parallel(
  cb=>{
    return gulp.src([
      './package.json',
      './package-lock.json',
      './README.md',
      './plugin_meta',
    ]).pipe(gulp.dest('./dist'))
  },
  cb=>{
    return gulp.src([
      './public/**/*',
    ]).pipe(gulp.dest('./dist/public'))
  },
);
exports.packJS = gulp.series(copyFiles, altchainJSZip);

exports.altchainJSZip = () => {
  return altchainJSZip()
};
