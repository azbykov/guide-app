/**
 * Config
 */
var nconf = require('nconf');

var path = require('path');
var express = require('express');
var http = require('http');
var log = require('./lib/log.js')(module);

var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var router = require('./routes');
var app = express();

app.set('port', nconf.get('server:port'));

require('./lib/auth')(passport); // pass passport for configuration

if (app.get('env') !== 'production') {
	app.set('views', path.join(__dirname, 'templates/views'));
}

// PRODUCTION
if (app.get('env') === 'production') {
	app.set('views', path.join(__dirname, '../views'));
}

app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static('public'));
if (app.get('env') !== 'production') {
	app.use(express.static('bower_components'));
}


// required for passport
app.use(session({
	saveUninitialized: true,
	resave: true,
	secret: nconf.get('secret')	// session secret
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routing
router(app);
//
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	res.render('errors/404', {
		message: err.message,
		error: err
	});
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		console.log('------ START -----');
		console.log('app.js; line: 75');
		console.log(err);
		console.log('------- END -------');

		res.status(err.status || 500);
		res.render('errors/500', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('errors/500', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
