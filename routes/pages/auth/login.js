var base = require('../../abstract');

var ctrl = base({
	name: 'Вход | Guide SPb',
	template: 'auth/login',
	label: 'login'
});

ctrl.model = function (req, res) {
	req.data.message = req.flash('loginMessage');
	return 'signin';
};

module.exports = ctrl;
