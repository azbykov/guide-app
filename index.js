/**
 * Config
 */
require('./config');
var config = require('nconf');

/**
 * Mongo DB
 */
require('./lib/mongoose');

var app = require('./app');
var fs = require('fs');

var socket = config.get('server:socket');

// Удаляем сокет если есть
if (fs.existsSync(socket)) {
	fs.unlinkSync(socket);
}


var server = app.listen(socket, function () {
	console.log('App listening at %s:%s', socket);
});
