var mongoose = require('mongoose');
var config = require('nconf');

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

mongoose.Promise = require('vow').Promise;
