var Vow = require('vow');
var _ = require('lodash');

var User = require('../../models/user').model;

var userList = [
	{
		created: Date.now(),
		local: {
			email: 'admin@guide.ru',
			password: 'admin'
		}
	}
];

function createModels() {
	var parallels = userList.map(function(userParams) {
		console.log('------ START -----');
		console.log('user.js; line: 17');
		console.log(userParams);
		console.log('------- END -------');

		var params = userParams.local;
		return User.find({'local.email': params.email}).then(function (user) {
			// check to see if theres already a user with that email
			if (!_.isEmpty(user)) {
				console.log('Такой адрес почты уже существует.');
				return Vow.resolve();
			} else {
				var user = new User();
				user.local.email = params.email;
				user.local.password = user.generateHash(params.password);
				return user.save(function(err) {
					if (err) {
						throw err;
					}
					console.log('add user', user);
				});
			}
		});

	});
	return parallels;
}

module.exports = {
	create: createModels
};
