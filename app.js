var express = require('express'),
path = require('path'),
favicon = require('serve-favicon'),
logger = require('morgan'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
router = express.Router(),
 index = require('./routes/index').router,
 model =require('./models/works'),
 multer = require('multer');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/',express.static(path.join(__dirname, 'public')));
app.use('/bower',express.static(path.join(__dirname,'bower_components')));
app.use(multer(
	{
		dest: './uploads/',
		rename: function(fieldname,filename){
			return filename+Date.now();
		},
		onFileUploadStart: function(file){
			console.log(file.originalname+'is starting...')
		},
		onFileUploadComplete: function(file){
			console.log(file.fieldname+'upload to'+file.path);
			console.log(file.name);
			done = true;
		}

}))





app.use('/',index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
