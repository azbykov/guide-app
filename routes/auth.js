var express = require('express');
var router = express.Router();
var passport = require('passport');

var login = require('./pages/auth/login');
var signup = require('./pages/auth/signup');


/* GET home page. */
router.get('/', function (req, res) {
	res.redirect('/auth/login');
});

router.get('/login', function (req, res) {
	login.run(req, res);
});

router.get('/signup', function (req, res) {
	signup.run(req, res);
});


// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/', // redirect to the secure profile section
	failureRedirect: '/auth/signup', // redirect back to the signup page if there is an error
	failureFlash: true // allow flash messages
}));

// process the login form
router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/', // redirect to the secure profile section
	failureRedirect: '/auth/login', // redirect back to the signup page if there is an error
	failureFlash: true // allow flash messages
}));

router.get('/signout', function (req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;
