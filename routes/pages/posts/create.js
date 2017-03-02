var base = require('../../abstract');
var helper = require('../../../helpers/posts');

var ctrl = base();

ctrl.model = function (req, res) {
	var params = req.query;
	console.log('------ START -----');
	console.log('create.js; line: 9');
	console.log(req);
	console.log('------- END -------');

	// return helper.create({req: req, params: params}).then(function (result) {
	// 	req.data.status = result.status;
	// }).fail(function (err) {
	// 	console.log(err);
	// 	req.data.status = err;
	// });
};

ctrl.resolve = function (req, res) {
	console.log('------ START -----');
	console.log('create.js; line: 23');
	console.log('resolve');
	console.log('------- END -------');

	return res.json(req.data.status);
};

module.exports = ctrl;
