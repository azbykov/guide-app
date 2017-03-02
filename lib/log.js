var winston = require('winston');
var config = require('nconf');
var _ = require('lodash');
var moment = require('moment');

function getLogger(module) {
	var label = _.isObject(module)
			? module.filename.split('/').slice(-2).join('/')
			: module
		;

	var defaultLogSettings = {
		timestamp: function () {
			return moment().format("DD.MM.YYYY HH:mm:ss:ms");
		},
		label: label
	};

	return new winston.Logger({
		transports: [
			new winston.transports.Console(
				_.defaults(
					config.get('log:console'),
					defaultLogSettings
				)
			),
			new winston.transports.File(
				_.defaults(
					config.get('log:file'),
					defaultLogSettings
				)
			)
		]
	});
}

module.exports = getLogger;
