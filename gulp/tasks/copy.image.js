'use strict';

module.exports = function() {
  $.gulp.task('copy:image', function() {
    return $.gulp.src('./source/images/**/*.*', { since: $.gulp.lastRun('copy:image') })
        // .pipe($.imagemin({verbose: true}))
        .pipe($.cache($.imagemin([
            $.imagemin.gifsicle({interlaced: true}),
            $.imagemin.jpegtran({progressive: true}),
            $.imageminJpegRecompress({
                loops: 5,
                min: 65,
                max: 70,
                quality:'medium'
            }),
            $.imagemin.svgo(),
            // $.imagemin.optipng({optimizationLevel: 3}),
            // $.pngquant({quality: '65-70', speed: 5})
        ],{
            verbose: true
        })))
        .pipe($.gulp.dest($.config.root + '/assets/img'));
  });
};
