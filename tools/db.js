/**
 * Config
 */
require('../config');
var Vow = require('vow');
var _ = require('lodash');
var users = require('./update/user');

var userList = [
	{
		created: Date.now(),
		local: {
			email: 'admin@guide.ru',
			password: 'admin'
		}
	}
];


/**
 * Mongoose
 */
require('../lib/mongoose');
var mongoose = require('mongoose');

function connect() {
	var defer = Vow.defer();
	mongoose.connection.on('open', function (err) {
		if (err) {
			return Vow.reject(err);
		}
		defer.resolve();
	});
	return defer.promise();
}

function update() {
	return Vow.all(users.create());
}

function close() {
	mongoose.disconnect(function () {
		return Vow.resolve('close connect');
	});
}


connect()
	.then(update)
	.then(close)
	.fail(function (err) {
		console.log('Finish error', err);
		return false;
	});
