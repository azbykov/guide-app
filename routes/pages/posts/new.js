var base = require('../../abstract');
var helper = require('../../../helpers/posts');

var ctrl = base({
	name: 'Добавить новый пост',
	template: 'edit/new',
	label: 'edit/new'
});

module.exports = ctrl;
