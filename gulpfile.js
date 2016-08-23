var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
  gulp.src('WebContent')
    .pipe(webserver({
      port: 9000,
      host: "0.0.0.0",	
      livereload: true,
      open: true,
      proxies: [
      		{
      			source: '/model',
      			target:'http://dkasub.corp.lego.com:21000/sap/opu/odata/sap/Z_GATEWAY_TRAINING_XX_SRV'
      		}
      	]
    }));
});

gulp.task('default', ['webserver']);