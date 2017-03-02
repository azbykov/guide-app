var base = require('../../abstract');

var ctrl = base({
	name: 'Регистрация | Guide SPb',
	template: 'signup',
	label: 'signup'
});

ctrl.model = function (req, res) {
	req.data.message = req.flash('signupMessage');
	return 'signup';
};

module.exports = ctrl;
