var Vow = require('vow');
var _ = require('lodash');
var Log = require('../lib/log');


var Ctrl = function (options) {
	options = options || {};
	this.settings = {
		name: options.name || 'default ctrl',
		label: options.label || 'defaultCtrl',
		template: options.template || 'default',
		title: options.title || options.name || 'default ctrl'
	};
	this.log = Log('controller ' + this.settings.label);
	_.bindAll(this);
};

Ctrl.prototype.beforeModel = function (req, res) {
	return false;
};

Ctrl.prototype.model = function (req, res) {
	return false;
};

Ctrl.prototype.resolve = function (req, res) {
	return false;
};

Ctrl.prototype.render = function (req, res) {
	var self = this;
	var data = _.defaults(req.data, self.settings);
	res.render(self.settings.template, data);
};


Ctrl.prototype.run = function (req, res) {
	var self = this;

	req.data = {};
	req.data.user = req.user;
	self.log.info('start ctrl');
	Vow.resolve().then(function() {
		self.log.info('run beforeModel');
		return self.beforeModel(req, res);
	}).then(function() {
		self.log.info('run model');
		return self.model(req, res);
	}).then(function() {
		self.log.info('run resolve');
		return self.resolve(req, res);
	}).then(function() {
		self.log.info('run render');
		if (!res._header) {
			return self.render(req, res);
		}
	});
};

module.exports = function (options) {
	return new Ctrl(options);
};
