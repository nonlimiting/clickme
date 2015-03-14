var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var index = require('./routes/index');
var login = require('./routes/login');
var friends = require('./routes/friends');
var setting = require('./routes/setting');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session setting
app.use(session({ 
	secret: "clickme",
	store: new MongoStore({ 
        db: "session"
    }),
	cookie: {
		maxAge: 60*1000*30
    },
    saveUninitialized: true,
    resave: false
}));

// router setting
app.use('/login', login);
// is login handle
app.use(function(req,res,next){
	if(req.session.user == null) { 
		res.redirect('/login');
	}
	else { 
		next();
	}
});
app.use('/', index);
app.use('/friends', friends);
app.use('/setting', setting);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  	var err = new Error('未找到该页面！');
  	err.status = 404;
  	next(err);
});

// db connecting
mongoose.connect('mongodb://localhost/clickme');
mongoose.connection.on('error', function (err) {
	console.log('Mongoose connection error: ' + err);
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
