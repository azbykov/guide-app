var nconf = require('nconf');
var path = require('path');
nconf.argv()
	.env()
;


// Add ENV config
nconf.file({file: path.join(__dirname, nconf.get('NODE_ENV') || 'development' + '.json')});
// Add default config
nconf.defaults(require('./common'));


// Add logdir path
var logsDir = process.env.LOGS_DIR || path.join(__dirname, '../logs/', 'node.log');
nconf.set('log:file:filename', logsDir);
